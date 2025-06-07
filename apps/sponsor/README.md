<p align="center">
  <img width="20%" src="static/2024_rp_logo.svg" alt="Reflections | Projections Logo" />
</p>

# Reflections | Projections Sponsor Site

## Overview

This website is designed to enhance the experience for sponsors of Reflections | Projections. It provides essential information about the conference and a powerful resume book, offering features that make document sharing and searching seamless, secure, and scalable. The platform is hosted at [sponsor.reflectionsprojections.org](https://sponsor.reflectionsprojections.org).

---

## Features

### Resume Data
- **Structured Resume Metadata**: Includes fields such as:
  - Name
  - Major
  - Degree
  - Graduation Year
  - Job Interests
  - Portfolios (if available)

### Advanced Search
- **Fuzzy Search**: Enables flexible search functionality, especially for selecting majors.

### Pagination
- **Efficient State Management**: Manages the current page and page size to optimize performance.

### Responsive Views
- **Mobile and Medium Screen Detection**: Dynamically adjusts the UI for different screen sizes.

### Resume Selection
- **Multi-Select Functionality**: Allows users to select and manage multiple resumes efficiently.

### View Toggle
- **Customizable Views**: Switch between list views and grid views effortlessly.

### Light-Dark Mode
- **Theme Support**: Provides a seamless transition between light and dark modes.

### Batch Resume Downloads
- **Download Manager**: Supports single and batch downloads, including the creation of ZIP files for multiple resumes.

---

## Development Information

### Stack
This project is built with the latest web technologies to ensure speed, reliability, and scalability:
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for improved code quality and development experience.
- **Vite**: A next-generation frontend tooling system that offers fast builds and hot module replacement.
- **Chakra UI**: A modern React component library for styling.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Fuse.js**: A lightweight fuzzy-search library.
- **JSZip**: For creating ZIP files directly in the browser.
- **FileSaver.js**: For saving files on the client-side.

### Setup and Configuration
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

#### Key Plugins
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh.

### Core Features for Developers
- **Fast Refresh**: Instant feedback on edits made to your React components.
- **TypeScript**: Strong typing for better code quality and developer experience.
- **ESLint**: Linting for maintaining code quality and consistency.
- **Vite**: Fast builds and hot module replacement for rapid development.
- **Chakra UI**: Pre-styled, accessible components for rapid UI development.

### Expanding the ESLint Configuration
For production applications, we recommend updating the ESLint configuration to enable type-aware lint rules:

#### Configuration Example
```javascript
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

#### Recommended Plugins
- Replace `plugin:@typescript-eslint/recommended` with:
  - `plugin:@typescript-eslint/recommended-type-checked`
  - `plugin:@typescript-eslint/strict-type-checked`
  - Optionally: `plugin:@typescript-eslint/stylistic-type-checked`

- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add:
  - `plugin:react/recommended`
  - `plugin:react/jsx-runtime`

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

Thank you for exploring the Reflections | Projections Sponsor Resume Book! Feel free to reach out with any questions or feedback.

