// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {CompliantYieldVault} from "../src/CompliantYieldVault.sol";
import {NullifierRegistry} from "../src/NullifierRegistry.sol";
import {INullifierRegistry} from "../src/interfaces/INullifierRegistry.sol";
import {IReclaimVerifier} from "../src/interfaces/IReclaimVerifier.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Simple ERC20 for testing
contract TestToken is ERC20 {
    constructor() ERC20("Test Token", "TEST") {
        _mint(msg.sender, 1_000_000 ether);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/// @notice Test verifier
contract TestVerifier is IReclaimVerifier {
    function verifyProof(bytes calldata) external pure returns (bool) {
        return true;
    }

    function extractClaim(bytes calldata) external pure returns (bytes memory) {
        return "";
    }
}

contract CompliantYieldVaultTest is Test {
    CompliantYieldVault public vault;
    NullifierRegistry public registry;
    TestVerifier public verifier;
    TestToken public token;

    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public admin = makeAddr("admin");

    bytes public validProof = abi.encode("proof");

    function setUp() public {
        vm.startPrank(admin);

        token = new TestToken();
        verifier = new TestVerifier();
        registry = new NullifierRegistry(address(verifier));
        vault = new CompliantYieldVault(
            token,
            address(registry),
            "Compliant mETH Vault",
            "cvMETH"
        );

        // Fund test accounts
        token.transfer(alice, 1000 ether);
        token.transfer(bob, 1000 ether);

        vm.stopPrank();
    }

    function test_AccreditedCanDeposit() public {
        // Get accredited
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        // Deposit
        vm.startPrank(alice);
        token.approve(address(vault), 100 ether);
        uint256 shares = vault.deposit(100 ether, alice);
        vm.stopPrank();

        assertGt(shares, 0);
        assertEq(vault.balanceOf(alice), shares);
    }

    function test_NonAccreditedCannotDeposit() public {
        vm.startPrank(bob);
        token.approve(address(vault), 100 ether);

        vm.expectRevert(CompliantYieldVault.NotAccredited.selector);
        vault.deposit(100 ether, bob);
        vm.stopPrank();
    }

    function test_CanWithdrawWithoutAccreditation() public {
        // Get accredited and deposit
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        vm.startPrank(alice);
        token.approve(address(vault), 100 ether);
        vault.deposit(100 ether, alice);

        // Wait for accreditation to expire
        vm.warp(block.timestamp + 366 days);

        // Should still be able to withdraw
        uint256 shares = vault.balanceOf(alice);
        uint256 assets = vault.redeem(shares, alice, alice);
        vm.stopPrank();

        assertGt(assets, 0);
        assertEq(vault.balanceOf(alice), 0);
    }

    function test_CanDepositView() public {
        assertFalse(vault.canDeposit(alice));

        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        assertTrue(vault.canDeposit(alice));
    }

    function test_MintSharesRequiresAccreditation() public {
        vm.startPrank(bob);
        token.approve(address(vault), 100 ether);

        vm.expectRevert(CompliantYieldVault.NotAccredited.selector);
        vault.mint(50 ether, bob);
        vm.stopPrank();
    }
}
