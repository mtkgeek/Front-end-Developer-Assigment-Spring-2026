# TaskDash - Tasks Dashboard Assignment

A clean, modern, and well-structured task management dashboard built with Nuxt 4, Vue 3, Pinia, and Tailwind CSS.

## Project Overview

This project was built as part of the Front-end Developer Assignment for Localazy. It features a robust task management system with a focus on code quality, maintainability, and user experience.

## Features Implemented

### Feature A: Tasks Dashboard & Filtering

- **Dynamic Task List**: Fetches real-time data from a JSON-backed mock datastore using `useAsyncData`.
- **Advanced Filtering**: Custom status-based filtering (All, Todo, In Progress, Done) managed via a shared Pinia store and modular composable.
- **State Handling**: Comprehensive UI coverage for loading, error, and empty result states.
- **Reusable Logic**: Task-related business logic is encapsulated in `useTasks` composable and `useTasksStore`.

### Feature B: Detail Page & Route Management

- **Dynamic Routing**: Implementation of `/tasks/[id]` for focused task viewing and editing.
- **Middleware Validation**: Custom `task-exists` middleware to validate numeric IDs and handle redirects gracefully.
- **Error Resilience**: Automatic redirection to a custom 404 page for non-existent tasks or invalid IDs.

### Feature C: Interactive Form & Data Persistence

- **Task Management**: Ability to update task titles and status directly from the detail page.
- **API Integration**: Connects with `PUT /api/tasks/[id]` for data persistence.
- **UX Feedback**: Implementation of loading spinners during the 2-second simulated API delay, clear error messaging for failed updates, and reactive success feedback on successful save.

### Design & UI/UX

- **Responsive Layout**: Built with a global layout (`default.vue`) including a sticky navigation bar and footer.
- **Tailwind CSS**: Modern, accessible UI with smooth transitions, hover effects, and a coherent color system.
- **Custom 404 Page**: A designed "Not Found" experience to keep users within the application flow.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Formatting/Linting**: ESLint & Prettier

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

1. Install dependencies:

   ```shell
   pnpm install
   ```

2. Generate types and prepare the development environment:

   ```shell
   pnpm run postinstall
   ```

3. Start the development server:

   ```shell
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## 📁 Project Structure

- `app/components/`: Reusable UI components (e.g., `TaskCard.vue`).
- `app/composables/`: Shared business logic and data fetching hooks.
- `app/layouts/`: Application structural wrappers.
- `app/middleware/`: Route guards and validation logic.
- `app/pages/`: View components and routing.
- `app/stores/`: Pinia state management modules.
- `server/api/`: Nuxt server routes for task operations.
- `server/data/`: Mock JSON data storage.
- `server/utils/`: Server-side utilities and data access layers.

---

Built for Localazy Assignment.
