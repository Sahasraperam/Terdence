import { useWorkflowStore } from '../../store/workflowStore';
import { StartForm } from '../forms/StartForm';
import { TaskForm } from '../forms/TaskForm';
import { ApprovalForm } from '../forms/ApprovalForm';
import { AutomatedForm } from '../forms/AutomatedForm';
import { EndForm } from '../forms/EndForm';

export function NodeConfigPanel() {
  const selectedNodeId = useWorkflowStore(state => state.selectedNodeId);
  const nodes = useWorkflowStore(state => state.nodes);
  const updateNodeData = useWorkflowStore(state => state.updateNodeData);
  const deleteNode = useWorkflowStore(state => state.deleteNode);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-gray-50 border-l border-gray-200 p-6 flex flex-col justify-center items-center text-center h-full text-gray-400">
        <p className="text-sm">Select a node on the canvas to configure it.</p>
      </aside>
    );
  }

  const handleDataChange = (data: any) => {
    updateNodeData(selectedNode.id, data);
  };

  const renderForm = () => {
    switch (selectedNode.type) {
      case 'start': return <StartForm initialData={selectedNode.data as any} onChange={handleDataChange} />;
      case 'task': return <TaskForm initialData={selectedNode.data as any} onChange={handleDataChange} />;
      case 'approval': return <ApprovalForm initialData={selectedNode.data as any} onChange={handleDataChange} />;
      case 'automated': return <AutomatedForm initialData={selectedNode.data as any} onChange={handleDataChange} />;
      case 'end': return <EndForm initialData={selectedNode.data as any} onChange={handleDataChange} />;
      default: return <div>Unknown node type</div>;
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-5 shrink-0 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider text-left">Configure</h3>
        <button 
          onClick={() => deleteNode(selectedNode.id)}
          className="text-red-600 font-medium hover:text-red-800 text-xs px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors"
        >
          Delete Node
        </button>
      </div>
      
      {renderForm()}
    </aside>
  );
}
