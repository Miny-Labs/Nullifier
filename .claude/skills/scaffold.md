---
description: Scaffold new components, contracts, or hooks following project patterns
allowed-tools: Read, Write, Edit
---

# Scaffold New Files

Create new files following the project's established patterns.

## Arguments

$ARGUMENTS

## Supported Scaffolds

### React Component
```
/scaffold component VaultList
```
Creates `frontend/components/VaultList.tsx` with:
- TypeScript interface for props
- Loading/error/empty states
- Tailwind + shadcn/ui styling

### React Hook
```
/scaffold hook useVaults
```
Creates `frontend/hooks/useVaults.ts` with:
- wagmi/react-query integration
- Proper typing
- Error handling

### API Route
```
/scaffold api verify-status
```
Creates `frontend/app/api/verify-status/route.ts` with:
- NextResponse handling
- Error handling
- TypeScript types

### Smart Contract
```
/scaffold contract MockToken
```
Creates `contracts/src/MockToken.sol` with:
- SPDX license
- Pragma statement
- NatSpec comments
- Custom errors
- Events

### Contract Test
```
/scaffold test MockToken
```
Creates `contracts/test/MockToken.t.sol` with:
- Forge Test import
- setUp function
- Test functions with proper naming

## Process

1. Parse the scaffold type and name from arguments
2. Read the appropriate skill file for patterns
3. Generate the file with project conventions
4. Place in correct directory
5. Report what was created
