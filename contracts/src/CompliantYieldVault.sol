// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {INullifierRegistry} from "./interfaces/INullifierRegistry.sol";

/// @title CompliantYieldVault
/// @author NULLIFIER Team
/// @notice ERC-4626 vault that requires accredited investor verification for deposits
/// @dev Withdrawals are unrestricted - users can always exit their positions
contract CompliantYieldVault is ERC4626 {
    using SafeERC20 for IERC20;

    // ============ Errors ============

    /// @notice Thrown when depositor is not accredited
    error NotAccredited();

    /// @notice Thrown when zero address is provided
    error ZeroAddress();

    // ============ Events ============

    /// @notice Emitted when vault parameters are updated
    event VaultUpdated(address indexed updatedBy);

    // ============ State ============

    /// @notice NullifierRegistry for accreditation checks
    INullifierRegistry public immutable nullifierRegistry;

    // ============ Constructor ============

    /// @notice Creates a new compliant yield vault
    /// @param _asset The underlying asset (e.g., mETH, cmETH)
    /// @param _nullifierRegistry The NullifierRegistry contract address
    /// @param _name Vault share token name
    /// @param _symbol Vault share token symbol
    constructor(
        IERC20 _asset,
        address _nullifierRegistry,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) {
        if (_nullifierRegistry == address(0)) revert ZeroAddress();
        nullifierRegistry = INullifierRegistry(_nullifierRegistry);
    }

    // ============ Modifiers ============

    /// @notice Restricts function to accredited investors only
    modifier onlyAccredited() {
        if (!nullifierRegistry.isAccredited(msg.sender)) {
            revert NotAccredited();
        }
        _;
    }

    // ============ Deposit Functions (Restricted) ============

    /// @notice Deposits assets and mints shares to receiver
    /// @dev Only accredited investors can deposit
    /// @param assets Amount of assets to deposit
    /// @param receiver Address to receive shares
    /// @return shares Amount of shares minted
    function deposit(
        uint256 assets,
        address receiver
    ) public override onlyAccredited returns (uint256 shares) {
        return super.deposit(assets, receiver);
    }

    /// @notice Mints exact shares by depositing assets
    /// @dev Only accredited investors can mint
    /// @param shares Amount of shares to mint
    /// @param receiver Address to receive shares
    /// @return assets Amount of assets deposited
    function mint(
        uint256 shares,
        address receiver
    ) public override onlyAccredited returns (uint256 assets) {
        return super.mint(shares, receiver);
    }

    // ============ Withdrawal Functions (Unrestricted) ============

    // withdraw() and redeem() are inherited from ERC4626 without modification
    // Users can always exit their positions regardless of accreditation status

    // ============ View Functions ============

    /// @notice Checks if a user can deposit (is accredited)
    /// @param user Address to check
    /// @return True if user can deposit
    function canDeposit(address user) external view returns (bool) {
        return nullifierRegistry.isAccredited(user);
    }
}
