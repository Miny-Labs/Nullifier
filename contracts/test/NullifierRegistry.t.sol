// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {NullifierRegistry} from "../src/NullifierRegistry.sol";
import {INullifierRegistry} from "../src/interfaces/INullifierRegistry.sol";
import {IReclaimVerifier} from "../src/interfaces/IReclaimVerifier.sol";

/// @notice Test verifier that accepts all proofs (for testing only)
contract TestVerifier is IReclaimVerifier {
    bool public shouldVerify = true;

    function setVerification(bool _shouldVerify) external {
        shouldVerify = _shouldVerify;
    }

    function verifyProof(bytes calldata) external view returns (bool) {
        return shouldVerify;
    }

    function extractClaim(bytes calldata) external pure returns (bytes memory) {
        return "";
    }
}

contract NullifierRegistryTest is Test {
    NullifierRegistry public registry;
    TestVerifier public verifier;

    address public alice = makeAddr("alice");
    address public bob = makeAddr("bob");
    address public admin = makeAddr("admin");

    bytes public validProof = abi.encode("valid-proof");

    function setUp() public {
        vm.startPrank(admin);
        verifier = new TestVerifier();
        registry = new NullifierRegistry(address(verifier));
        vm.stopPrank();
    }

    function test_MintCredential() public {
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        assertTrue(registry.hasCredential(alice));
        assertTrue(registry.isAccredited(alice));

        INullifierRegistry.Credential memory cred = registry.getCredential(alice);
        assertEq(uint256(cred.accreditationType), uint256(INullifierRegistry.AccreditationType.Income));
        assertFalse(cred.revoked);
    }

    function test_CannotMintTwice() public {
        vm.startPrank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        vm.expectRevert(NullifierRegistry.AlreadyHasCredential.selector);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.NetWorth);
        vm.stopPrank();
    }

    function test_InvalidProofReverts() public {
        verifier.setVerification(false);

        vm.prank(alice);
        vm.expectRevert(NullifierRegistry.InvalidProof.selector);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);
    }

    function test_RevokeCredential() public {
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        vm.prank(admin);
        registry.revokeCredential(alice);

        assertFalse(registry.isAccredited(alice));
        assertTrue(registry.hasCredential(alice));

        INullifierRegistry.Credential memory cred = registry.getCredential(alice);
        assertTrue(cred.revoked);
    }

    function test_CredentialExpiry() public {
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        assertTrue(registry.isAccredited(alice));

        // Fast forward past expiry
        vm.warp(block.timestamp + 366 days);

        assertFalse(registry.isAccredited(alice));
        assertTrue(registry.hasCredential(alice));
    }

    function test_SoulboundCannotTransfer() public {
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        uint256 tokenId = registry.tokenIdOf(alice);

        vm.prank(alice);
        vm.expectRevert(NullifierRegistry.SoulboundToken.selector);
        registry.transferFrom(alice, bob, tokenId);
    }

    function test_OnlyRevokerCanRevoke() public {
        vm.prank(alice);
        registry.mintCredential(validProof, INullifierRegistry.AccreditationType.Income);

        vm.prank(bob);
        vm.expectRevert();
        registry.revokeCredential(alice);
    }
}
