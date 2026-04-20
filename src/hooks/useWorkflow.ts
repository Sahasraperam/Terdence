import { useWorkflowStore } from '../store/workflowStore';
import { simulateWorkflow } from '../services/api';
import { serializeWorkflow, traverseWorkflow } from '../utils/graphUtils';
import { NODE_REGISTRY, type NodeType, type WorkflowNode } from '../types/workflow';

export const useWorkflow = () => {
  const nodes = useWorkflowStore(state => state.nodes);
  const edges = useWorkflowStore(state => state.edges);
  const addNodeToStore = useWorkflowStore(state => state.addNode);

  const addNode = (type: NodeType, position: { x: number, y: number }) => {
    const newNode: WorkflowNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      position,
      data: { ...NODE_REGISTRY[type].defaultData } as any,
    } as WorkflowNode;
    addNodeToStore(newNode);
  };

  const runSimulation = async () => {
    // Validate graph logic before hitting API
    traverseWorkflow(nodes, edges);

    const payload = serializeWorkflow(nodes, edges);
    const result = await simulateWorkflow(payload);
    return result;
  };

  const getTraversalOrder = () => {
    return traverseWorkflow(nodes, edges);
  };

  return { addNode, runSimulation, getTraversalOrder };
};
