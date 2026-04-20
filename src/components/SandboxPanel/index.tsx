import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { validateWorkflow, serializeWorkflow } from '../../utils/graphUtils';
import { PlayCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export function SandboxPanel() {
  const nodes = useWorkflowStore(state => state.nodes);
  const edges = useWorkflowStore(state => state.edges);
  
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleRun = async () => {
    const validation = validateWorkflow(nodes, edges);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLogs([]);
      setIsOpen(true);
      return;
    }

    setErrors([]);
    setLoading(true);
    setIsOpen(true);
    
    try {
      const payload = serializeWorkflow(nodes, edges);
      const res = await fetch('/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const logData = await res.json();
      setLogs(logData);
    } catch (err) {
      setErrors(['Simulation failed: server error']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute right-4 bottom-4 z-10 w-96 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="bg-white border text-left border-gray-200 rounded-lg shadow-xl w-full p-4 mb-4 font-sans pointer-events-auto max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3">
            <h3 className="font-bold text-sm text-gray-800">Simulation Run</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs font-medium px-2 py-1 bg-gray-100 rounded">Close</button>
          </div>
          
          {errors.length > 0 && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-3 text-sm flex flex-col gap-1">
              <div className="flex items-center gap-2 font-bold mb-1">
                <AlertCircle size={16} /> Validation Errors
              </div>
              <ul className="list-disc pl-5">
                {errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-6 text-sm text-gray-500 animate-pulse">Running simulation...</div>
          )}

          {!loading && logs.length > 0 && (
            <div className="flex flex-col gap-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {logs.map((log, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-1 z-10 text-xs font-bold font-mono">
                    {log.step}
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-3 rounded border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                       {log.status === 'success' ? <CheckCircle2 size={14} className="text-green-500" /> : <AlertCircle size={14} className="text-red-500" />}
                       <span className="font-medium text-xs text-gray-800">{log.nodeId}</span>
                    </div>
                    <div className="text-xs text-slate-500">{log.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && logs.length === 0 && errors.length === 0 && (
             <div className="text-sm text-gray-500 py-4 text-center">No simulation logs.</div>
          )}
        </div>
      )}

      <button 
        onClick={handleRun}
        className="pointer-events-auto flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95"
      >
        <PlayCircle size={20} />
        Run Workflow
      </button>
    </div>
  );
}
