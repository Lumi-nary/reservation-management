# Architecture Documentation

## Project: reservation-management

### 1. Executive Summary

This document outlines the architecture of the `reservation-management` web application. It is a monolith project built with Vue.js and TypeScript. The application provides a reservation management system for both internal and external clients.

### 2. Technology Stack

| Category      | Technology   | Version   | Justification                               |
|---------------|--------------|-----------|---------------------------------------------|
| Framework     | Vue          | ^3.5.22   | Core frontend framework                     |
| Language      | TypeScript   | ~5.9.0    | Superset of JavaScript for type safety      |
| State Mngmt   | Pinia        | ^3.0.3    | Official state management library for Vue   |
| Router        | Vue Router   | ^4.6.3    | Official router for Vue                     |
| UI Library    | Swiper       | ^12.0.3   | For carousels/sliders                       |
| CSS Framework | Tailwind CSS | ^4.1.16   | Utility-first CSS framework                 |
| Build Tool    | Vite         | ^7.1.11   | Fast build tool and dev server              |
| Testing       | Vitest       | ^3.2.4    | Unit testing framework                      |
| E2E Testing   | Playwright   | ^1.56.1   | End-to-end testing framework                |
| Linter        | ESLint       | ^9.37.0   | Code linting                                |
| Formatter     | Prettier     | 3.6.2     | Code formatter                              |

### 3. Architecture Pattern

The application follows a **Component-based Architecture**, which is standard for Vue.js projects. The UI is broken down into a hierarchy of reusable components.

### 4. Data Architecture

No database or data persistence layer was detected in the codebase. The application currently manages state in memory using Pinia.

### 5. API Design

No backend API was detected in the codebase. The application is purely a frontend application at this stage.

### 6. Component Overview

The application has the following components:

- **`NavigationBar.vue`**: A reusable navigation bar component.
- **`LandingPage.vue`**: The main view for the landing page.

### 7. Source Tree

See [Source Tree Analysis](./source-tree-analysis.md) for a detailed breakdown of the project structure.

### 8. Development Workflow

See [Development Guide](./development-guide.md) for instructions on how to set up and run the project.

### 9. Deployment Architecture

No deployment configuration was detected.

### 10. Testing Strategy

The project is set up with Vitest for unit testing and Playwright for end-to-end testing.
