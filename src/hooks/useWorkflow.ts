import { useWorkflowStore } from '../store/workflowStore';
import { simulateWorkflow } from '../services/api';
import { serializeWorkflow, traverseWorkflow } from '../utils/graphUtils';

export const useWorkflow = () => {
  const nodes = useWorkflowStore(state => state.nodes);
  const edges = useWorkflowStore(state => state.edges);

  const runSimulation = async () => {
    const payload = serializeWorkflow(nodes, edges);
    const result = await simulateWorkflow(payload);
    return result;
  };

  const getTraversalOrder = () => {
    return traverseWorkflow(nodes, edges);
  };

  return { runSimulation, getTraversalOrder };
};
