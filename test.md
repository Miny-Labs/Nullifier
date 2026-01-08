---
description: Run tests for contracts and/or frontend
allowed-tools: Bash(forge:*), Bash(pnpm:*), Read
---

# Run Tests

Run tests for the specified component or all components.

## Arguments

$ARGUMENTS

If no arguments provided, run all tests.

## Commands

### Smart Contract Tests (Foundry)
```bash
cd contracts

# All tests
forge test -vvv

# Specific contract
forge test --match-contract NullifierRegistryTest -vvv

# Specific test function
forge test --match-test test_MintCredential -vvv

# Gas report
forge test --gas-report
```

### Frontend Tests
```bash
cd frontend

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## Process

1. Identify which tests to run based on arguments
2. Run the appropriate test command(s)
3. Report results clearly
4. If tests fail, analyze the error and suggest fixes
