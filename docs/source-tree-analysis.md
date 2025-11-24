# Source Tree Analysis

## Project: reservation-management

### Project Structure

The project is a monolith web application.

### Directory Tree

```
reservation-management/
├── .bmad/              # BMAD framework files
├── .gemini/            # Gemini CLI configuration
├── .vscode/            # VSCode settings
├── dist/               # Build output directory
├── docs/               # Project documentation
├── e2e/                # End-to-end tests
├── node_modules/       # Project dependencies
├── playwright/         # Playwright test configuration
├── public/             # Public assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── router/         # Vue router configuration
│   ├── stores/         # Pinia state management stores
│   └── views/          # Vue components for pages
├── .editorconfig       # Editor configuration
├── .gitattributes      # Git attributes
├── .gitignore          # Git ignore file
├── .prettierrc.json    # Prettier configuration
├── env.d.ts            # Environment type definitions
├── eslint.config.ts    # ESLint configuration
├── index.html          # Main HTML file (entry point)
├── package.json        # Project manifest and dependencies
├── playwright.config.ts# Playwright configuration
├── postcss.config.cjs  # PostCSS configuration
├── README.md           # Project README
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.app.json   # TypeScript configuration for the app
├── tsconfig.json       # TypeScript configuration
├── tsconfig.node.json  # TypeScript configuration for Node.js
├── tsconfig.vitest.json# TypeScript configuration for Vitest
├── vite.config.ts      # Vite configuration
└── vitest.config.ts    # Vitest configuration
```

### Critical Directories

- **`src/`**: Contains all the application source code.
  - **`src/components/`**: Reusable Vue components.
  - **`src/views/`**: Vue components that represent application pages/views.
  - **`src/stores/`**: Pinia stores for state management.
  - **`src/router/`**: Vue Router configuration for defining application routes.
- **`public/`**: Static assets that are publicly accessible.
- **`e2e/`**: End-to-end tests.
- **`docs/`**: Project documentation.

### Entry Points

- **`index.html`**: The main HTML file that serves as the entry point for the web application.
- **`src/main.ts`**: The main TypeScript file that bootstraps the Vue application.
