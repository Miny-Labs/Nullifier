// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title IReclaimVerifier
/// @notice Interface for Reclaim Protocol's on-chain proof verifier
interface IReclaimVerifier {
    /// @notice Verifies a Reclaim proof
    /// @param proof The encoded proof data from Reclaim SDK
    /// @return bool True if the proof is valid
    function verifyProof(bytes calldata proof) external view returns (bool);

    /// @notice Extracts the claim data from a verified proof
    /// @param proof The encoded proof data
    /// @return claimData The extracted claim parameters
    function extractClaim(bytes calldata proof) external view returns (bytes memory claimData);
}
