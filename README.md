# HR Workflow Designer

A highly scalable, robust HR Workflow editor demonstrating clean React architecture.

## 1. Architecture

We adopted a strictly separated architecture where concerns are compartmentalized:
- **UI Components** (`src/components/`): Dumb, presentational chunks responsible solely for rendering, grouped by domain (`canvas`, `nodes`, `forms`, `sidebar`). Standard React Flow handles graph UI representation perfectly.
- **Logic** (`src/hooks/`): Connects UI to state & services, keeping components extremely lean.
- **State** (`src/store/`): We used **Zustand** rather than React Context for top-level graph data management. This choice guarantees optimal rendering performance (preventing whole-app re-renders on node drag changes), keeps the codebase minimal compared to Redux, and makes syncing form components with the Canvas completely frictionless.
- **Dynamic Form Configuration** (`src/components/forms/formConfig.ts` & `DynamicForm.tsx`): **Config-driven forms** drastically enhance scalability. Instead of hardcoding 50 separate forms as the application grows, new Node types only require appending their signature to a single `FORM_CONFIG` map which `DynamicForm` loops over to render strictly typed interfaces automatically.
- **API** (`src/services/`): Decoupled backend interactions through isolated async functions rather than placing fetches directly inside of React Components.

## 2. Flow

The user journey operates optimally decoupled from React renders:
**User** drags a node from `Sidebar` → React Flow interprets coordinates onto the `Canvas` → The Custom `NodeRenderer` is drawn → Data changes are dispatched to **Zustand Store** `useWorkflowStore` → Selecting nodes extracts `FORM_CONFIG` fields over a shared `updateNode` method → Invoking "Simulate Workflow" invokes hooks targeting the `API` simulation backend.

## 3. Tradeoffs

- **Mock API Service Strategy**: For simplicity and speed of iteration, I leveraged a localized mock API `services/api.ts` instead of standing up a full REST server or interceptor layer.
- **Focused purely on Scalability over Hyper-Polish UI**: By centralizing the Form logic in `DynamicForm` and prioritizing the structure/folder separations according to React architectural best practices, I allowed some basic UI utility styling to persist over intricate, bespoke custom styling.

## 4. What we'd improve next

- **Validation Engine**: Construct topological sorts tracking incoming/outgoing node rules rather than just cyclic references.
- **Full Backend Engine**: Attaching a real PostgreSQL backend API through TRPC or simple hooks.
- **Undo/Redo Context**: We could augment the Zustand store with middleware handling historical snapshots since our state operates externally to React itself.
