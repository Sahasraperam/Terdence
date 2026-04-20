import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export const serializeWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  return { nodes, edges };
};

export const traverseWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  const order: string[] = [];
  const visited = new Set<string>();

  // Detect missing starts
  let current = nodes.find(n => n.type === "start");
  if (!current) {
    throw new Error("Validation Error: Missing start node");
  }

  while (current) {
    // Detect cycle
    if (visited.has(current.id)) {
      throw new Error(`Validation Error: Cycle detected at node '${current.data.label}'`);
    }
    
    visited.add(current.id);
    order.push(current.id);

    const nextEdge = edges.find(e => e.source === current?.id);
    if (!nextEdge) {
      if (current.type !== 'end') {
        throw new Error(`Validation Error: Missing edge from node '${current.data.label}'`);
      }
      break;
    }

    current = nodes.find(n => n.id === nextEdge.target);
  }

  return order;
};
