import { useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { FormPanel } from './components/forms/FormPanel';
import { useWorkflow } from './hooks/useWorkflow';
import { PlayCircle } from 'lucide-react';

function App() {
  const { runSimulation } = useWorkflow();
  const [logs, setLogs] = useState<any[]>([]);
  const [running, setRunning] = useState(false);

  const handleSimulate = async () => {
    setRunning(true);
    try {
      const result = await runSimulation();
      setLogs(result.steps);
    } catch (e) {
      console.error(e);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-50 text-gray-900 absolute inset-0 text-left">
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
         <Sidebar />
         <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col gap-2 shrink-0 h-1/3">
            <button 
               onClick={handleSimulate}
               disabled={running}
               className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
               <PlayCircle size={18} />
               {running ? 'Simulating...' : 'Simulate Workflow'}
            </button>
            <div className="flex flex-col gap-1 overflow-y-auto mt-2">
               {logs.map((step, i) => (
                 <div key={i} className="text-xs text-gray-600 p-2 bg-white border rounded shadow-sm">
                   <div className="font-bold text-gray-800">{step.label || 'Unknown'} <span className="text-gray-400 font-normal">({step.type})</span></div>
                   <div className="text-green-600 font-medium capitalize mt-1">Status: {step.status}</div>
                 </div>
               ))}
               {!running && logs.length === 0 && (
                 <div className="text-xs text-gray-400 text-center py-4">No simulation data yet</div>
               )}
            </div>
         </div>
      </div>
      <div className="flex-1 relative h-full">
        <WorkflowCanvas />
      </div>
      <FormPanel />
    </div>
  );
}

export default App;
