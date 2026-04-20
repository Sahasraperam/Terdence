# HR Workflow Designer (Engineer Edition)

A highly scalable, robust HR Workflow editor demonstrating an enterprise-grade React architecture.

## 1. Architecture

We adopted a strictly separated architecture where concerns are compartmentalized:
- **UI** (`src/components/`): Dumb, presentational chunks responsible solely for rendering, grouped by domain (`canvas`, `nodes`, `forms`, `sidebar`). Standard React Flow handles graph UI representation perfectly.
- **Hooks** (`src/hooks/`): Connects UI to state & services, keeping components extremely lean. `useWorkflow` handles node adding and simulated execution traversal.
- **Store** (`src/store/`): We used **Zustand** rather than React Context for top-level graph data management. This choice guarantees optimal rendering performance (preventing whole-app re-renders on node drag changes), keeps the codebase minimal compared to Redux, and makes syncing form components with the Canvas completely frictionless.
- **API** (`src/services/`): Decoupled backend interactions through isolated async functions rather than placing fetches directly inside of React Components.
- **Utils** (`src/utils/`): Pure functions validating topologies (detecting missing starts, broken edges, cycles) separate from UI state logic.

## 2. Key Decisions

- **Config-Driven Forms for Scalability**: The `NODE_REGISTRY` paired with the `FORM_SCHEMA` maps drastically enhance scalability. Instead of hardcoding 50 separate forms as the application grows, new Node types only require appending their signature to a single registry configuration which `DynamicForm` loops over to render strictly typed interfaces automatically.
- **Global State via Zustand**: Keeps the codebase free of "prop drilling" while abstracting actions (`addNode`, `updateNode`) elegantly behind logic hooks over standard reducers.

## 3. Tradeoffs

- **Mock API instead of real Backend**: For simplicity and speed of iteration, I leveraged a localized mock API `services/api.ts` instead of standing up a full REST server or interceptor layer, emphasizing asynchronous payload simulation.
- **Focused on Extensibility over Styling**: By centralizing the Form logic in `DynamicForm` and prioritizing the structure/folder separations according to React architectural best practices, I traded hyper-custom UX components for sheer code modularity and extension capability.

## 4. Future Improvements

- **Undo/Redo**: We could augment the Zustand store with middleware handling historical snapshots since our state operates externally to React itself.
- **Complex Validation Engine**: Provide multi-branch resolution pathing and topological metrics inside the API response validation sequence.
- **Auto Layout Engine**: Implement a graph layout standard (e.g. Dagre) to neatly arrange disorganized user maps automatically.
