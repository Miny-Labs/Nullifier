// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {INullifierRegistry} from "./interfaces/INullifierRegistry.sol";
import {IReclaimVerifier} from "./interfaces/IReclaimVerifier.sol";

/// @title NullifierRegistry
/// @author NULLIFIER Team
/// @notice Soulbound ERC-721 credential for accredited investor verification
/// @dev Credentials are non-transferable and expire after 1 year
contract NullifierRegistry is ERC721, AccessControl, INullifierRegistry {
    // ============ Errors ============

    /// @notice Thrown when proof verification fails
    error InvalidProof();

    /// @notice Thrown when user already has a credential
    error AlreadyHasCredential();

    /// @notice Thrown when credential has expired
    error CredentialExpired();

    /// @notice Thrown when credential has been revoked
    error CredentialIsRevoked();

    /// @notice Thrown when attempting to transfer a soulbound token
    error SoulboundToken();

    /// @notice Thrown when credential does not exist
    error CredentialNotFound();

    // ============ Constants ============

    /// @notice Role for revoking credentials (compliance/admin)
    bytes32 public constant REVOKER_ROLE = keccak256("REVOKER_ROLE");

    /// @notice Credential validity period (1 year)
    uint256 public constant CREDENTIAL_VALIDITY = 365 days;

    // ============ State ============

    /// @notice Reclaim Protocol verifier contract
    IReclaimVerifier public immutable reclaimVerifier;

    /// @notice Counter for token IDs
    uint256 private _tokenIdCounter;

    /// @notice Mapping from holder address to credential data
    mapping(address => Credential) private _credentials;

    /// @notice Mapping from holder address to token ID
    mapping(address => uint256) private _holderToTokenId;

    // ============ Constructor ============

    /// @notice Initializes the registry with Reclaim verifier
    /// @param _reclaimVerifier Address of the Reclaim Protocol verifier
    constructor(address _reclaimVerifier) ERC721("NULLIFIER Credential", "NULL") {
        reclaimVerifier = IReclaimVerifier(_reclaimVerifier);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(REVOKER_ROLE, msg.sender);
    }

    // ============ External Functions ============

    /// @notice Mints a new credential by verifying a Reclaim proof
    /// @param proof The encoded proof from Reclaim SDK
    /// @param accreditationType The type of accreditation being claimed
    function mintCredential(
        bytes calldata proof,
        AccreditationType accreditationType
    ) external {
        if (hasCredential(msg.sender)) revert AlreadyHasCredential();
        if (!reclaimVerifier.verifyProof(proof)) revert InvalidProof();

        uint256 tokenId = ++_tokenIdCounter;
        uint256 expiresAt = block.timestamp + CREDENTIAL_VALIDITY;

        _credentials[msg.sender] = Credential({
            accreditationType: accreditationType,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            revoked: false
        });

        _holderToTokenId[msg.sender] = tokenId;
        _safeMint(msg.sender, tokenId);

        emit CredentialMinted(msg.sender, tokenId, accreditationType, expiresAt);
    }

    /// @notice Revokes a credential (admin/compliance only)
    /// @param holder The address whose credential to revoke
    function revokeCredential(address holder) external onlyRole(REVOKER_ROLE) {
        if (!hasCredential(holder)) revert CredentialNotFound();

        _credentials[holder].revoked = true;
        uint256 tokenId = _holderToTokenId[holder];

        emit CredentialRevoked(holder, tokenId);
    }

    /// @inheritdoc INullifierRegistry
    function isAccredited(address holder) external view returns (bool) {
        Credential memory cred = _credentials[holder];
        return cred.accreditationType != AccreditationType.None &&
            !cred.revoked &&
            block.timestamp <= cred.expiresAt;
    }

    /// @inheritdoc INullifierRegistry
    function hasCredential(address holder) public view returns (bool) {
        return _credentials[holder].accreditationType != AccreditationType.None;
    }

    /// @inheritdoc INullifierRegistry
    function getCredential(address holder) external view returns (Credential memory) {
        return _credentials[holder];
    }

    /// @notice Gets the token ID for a holder
    /// @param holder The address to query
    /// @return The token ID (0 if none)
    function tokenIdOf(address holder) external view returns (uint256) {
        return _holderToTokenId[holder];
    }

    // ============ Overrides ============

    /// @notice Prevents token transfers (soulbound)
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        // Allow minting (from == address(0)) but block transfers
        if (from != address(0) && to != address(0)) {
            revert SoulboundToken();
        }

        return super._update(to, tokenId, auth);
    }

    /// @notice Required override for AccessControl
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
