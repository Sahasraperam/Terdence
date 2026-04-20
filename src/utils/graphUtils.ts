import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export const serializeWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  return { nodes, edges };
};

export const traverseWorkflow = (nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
  const order: string[] = [];
  let current = nodes.find(n => n.type === "start");

  while (current) {
    order.push(current.id);

    const nextEdge = edges.find(e => e.source === current?.id);
    if (!nextEdge) break;

    current = nodes.find(n => n.id === nextEdge.target);
  }

  return order;
};
