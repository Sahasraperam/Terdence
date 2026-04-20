import { useNodes } from '../../hooks/useNodes';
import { DynamicForm } from './DynamicForm';

export function FormPanel() {
  const { selectedNode, deleteNode } = useNodes();

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-gray-50 border-l border-gray-200 p-6 flex flex-col justify-center items-center text-center h-full text-gray-400">
        <p className="text-sm">Select a node on the canvas to configure it.</p>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-5 shrink-0 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider text-left">Configure</h3>
        <button 
          onClick={() => deleteNode(selectedNode.id)}
          className="text-red-600 font-medium hover:text-red-800 text-xs px-2 py-1 bg-red-50 hover:bg-red-100 rounded"
        >
          Delete
        </button>
      </div>
      
      <DynamicForm node={selectedNode} />
    </aside>
  );
}
