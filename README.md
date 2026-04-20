# HR Workflow Designer

A robust, type-safe workflow designer for HR operations built with modern web technologies.

## Architecture Overview

- **Core Framework**: React with TypeScript via Vite.
- **State Management**: Zustand handles the centralized state of all workflow nodes and edges, minimizing prop drilling and re-renders.
- **Workflow Engine**: `@xyflow/react` provides the interactive node-based drag-and-drop canvas.
- **Forms & Validation**: `react-hook-form` paired with `zod` for robust, type-safe configuration panels tailored dynamically to the selected node type.
- **Mock API**: MSW intercepts API requests, providing realistic sandbox simulation delays, and fetching options for dynamic dropdowns.
- **Styling**: Tailwind CSS v4 provides utility-first rapid styling.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the provided `localhost` URL in your browser.

## Design Decisions

- **Zustand**: Allowed us to lift the graph state out of the React Flow canvas to sync perfectly with a right sidebar (NodeConfigPanel) without performance hits. `useWorkflowStore` handles updates.
- **MSW**: Replicates the true feel of interacting with a live backend (simulation and loading dynamic parameters for "Automated" steps) without needing a separate Node REST server.
- **Scalable Forms**: By isolating each node type's form into its own component in `src/components/forms/`, adding new Node types requires appending a new component, promoting separation of concerns.

## Future Improvements

- Import/Export functionality using standard JSON.
- Adding validation error highlights by injecting flags into the `node.data`.
- Expanded undo/redo integrations.
# Terdence
