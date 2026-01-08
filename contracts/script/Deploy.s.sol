// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {NullifierRegistry} from "../src/NullifierRegistry.sol";
import {CompliantYieldVault} from "../src/CompliantYieldVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Deploy
/// @notice Deployment script for NULLIFIER contracts on Mantle Sepolia
contract DeployScript is Script {
    // Mantle Sepolia addresses - update these with actual deployed addresses
    address constant RECLAIM_VERIFIER = address(0); // TODO: Get from Reclaim Protocol
    address constant METH_TOKEN = address(0); // TODO: mETH on Mantle Sepolia
    address constant CMETH_TOKEN = address(0); // TODO: cmETH on Mantle Sepolia

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console2.log("Deploying from:", deployer);
        console2.log("Chain ID:", block.chainid);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy NullifierRegistry
        address reclaimVerifier = vm.envOr("RECLAIM_VERIFIER", RECLAIM_VERIFIER);
        require(reclaimVerifier != address(0), "RECLAIM_VERIFIER not set");

        NullifierRegistry registry = new NullifierRegistry(reclaimVerifier);
        console2.log("NullifierRegistry deployed at:", address(registry));

        // Deploy mETH Vault
        address methToken = vm.envOr("METH_TOKEN", METH_TOKEN);
        if (methToken != address(0)) {
            CompliantYieldVault methVault = new CompliantYieldVault(
                IERC20(methToken),
                address(registry),
                "Compliant mETH Vault",
                "cvMETH"
            );
            console2.log("mETH Vault deployed at:", address(methVault));
        }

        // Deploy cmETH Vault
        address cmethToken = vm.envOr("CMETH_TOKEN", CMETH_TOKEN);
        if (cmethToken != address(0)) {
            CompliantYieldVault cmethVault = new CompliantYieldVault(
                IERC20(cmethToken),
                address(registry),
                "Compliant cmETH Vault",
                "cvCMETH"
            );
            console2.log("cmETH Vault deployed at:", address(cmethVault));
        }

        vm.stopBroadcast();

        console2.log("\n=== Deployment Complete ===");
        console2.log("Update frontend/lib/contracts.ts with these addresses");
    }
}
