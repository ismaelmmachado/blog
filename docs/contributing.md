# Contributing

## Development Workflow

1. **Fork and clone** the repository
2. **Create a branch** for your change: `git checkout -b feature/foo`
3. **Make your changes** following the project conventions
4. **Run the test suite**: `npm run test`
5. **Run lint**: `npm run lint`
6. **Format code**: `npm run format`
7. **Commit** with a clear message
8. **Push** and open a Pull Request

## Code Conventions

- Use **ES modules** (`import`/`export`)
- Follow the **existing code style** in the repository
- Keep functions **small and focused**
- Add **JSDoc** for public APIs
- Use **semantic versioning**

## Adding New Features

1. Add routes in `src/index.js`
2. Create corresponding test files in `tests/`
3. Update documentation in `docs/`
4. Run `npm run build` to verify the build

## Reporting Bugs

- Open an issue with a clear title and description
- Include reproduction steps
- Mention Node.js version and operating system

## Pull Request Process

1. Ensure all checks pass (`test`, `lint`)
2. Update documentation if the change is user-facing
3. Respond to reviewer feedback promptly
4. Merge after approval