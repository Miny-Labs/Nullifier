// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title INullifierRegistry
/// @notice Interface for the NullifierRegistry credential contract
interface INullifierRegistry {
    /// @notice Accreditation types for investor verification
    enum AccreditationType {
        None,
        Income, // $200K+ annual income
        NetWorth, // $1M+ net worth
        Both // Meets both thresholds
    }

    /// @notice Credential data stored for each verified investor
    struct Credential {
        AccreditationType accreditationType;
        uint256 issuedAt;
        uint256 expiresAt;
        bool revoked;
    }

    /// @notice Emitted when a new credential is minted
    event CredentialMinted(
        address indexed holder,
        uint256 indexed tokenId,
        AccreditationType accreditationType,
        uint256 expiresAt
    );

    /// @notice Emitted when a credential is revoked
    event CredentialRevoked(address indexed holder, uint256 indexed tokenId);

    /// @notice Checks if an address has a valid (non-expired, non-revoked) credential
    function isAccredited(address holder) external view returns (bool);

    /// @notice Checks if an address has any credential (valid or not)
    function hasCredential(address holder) external view returns (bool);

    /// @notice Gets the credential data for a holder
    function getCredential(address holder) external view returns (Credential memory);
}
