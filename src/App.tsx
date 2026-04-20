import { NodeSidebar } from './components/NodeSidebar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { SandboxPanel } from './components/SandboxPanel';

function App() {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-50 text-gray-900 absolute inset-0 text-left">
      <NodeSidebar />
      <div className="flex-1 relative h-full">
        <WorkflowCanvas />
        <SandboxPanel />
      </div>
      <NodeConfigPanel />
    </div>
  );
}

export default App;
