import { useWorkflowStore } from '../store/workflowStore';

export const useNodes = () => {
  const addNode = useWorkflowStore(state => state.addNode);
  const updateNode = useWorkflowStore(state => state.updateNode);
  const deleteNode = useWorkflowStore(state => state.deleteNode);
  const selectedNodeId = useWorkflowStore(state => state.selectedNodeId);
  const nodes = useWorkflowStore(state => state.nodes);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return {
    addNode,
    updateNode,
    deleteNode,
    selectedNode,
    selectedNodeId,
    nodes
  };
};
