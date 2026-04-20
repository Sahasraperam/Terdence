import type { WorkflowNode, WorkflowEdge, ValidationResult } from '../types/workflow';

export function detectCycles(edges: WorkflowEdge[]): boolean {
  const adjacencyList = new Map<string, string[]>();
  
  for (const edge of edges) {
    if (!adjacencyList.has(edge.source)) {
      adjacencyList.set(edge.source, []);
    }
    adjacencyList.get(edge.source)!.push(edge.target);
  }

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(nodeId: string): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recursionStack.has(neighbor)) {
        return true; // Cycle detected
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  for (const source of adjacencyList.keys()) {
    if (!visited.has(source)) {
      if (dfs(source)) {
        return true;
      }
    }
  }

  return false;
}

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]): ValidationResult {
  const errors: string[] = [];

  const startNodes = nodes.filter(n => n.type === 'start');
  const endNodes = nodes.filter(n => n.type === 'end');

  if (startNodes.length === 0) {
    errors.push('Workflow must have exactly one Start node.');
  } else if (startNodes.length > 1) {
    errors.push('Workflow cannot have more than one Start node.');
  }

  if (endNodes.length === 0) {
    errors.push('Workflow must have at least one End node.');
  }

  // Check disconnected nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  nodes.forEach(node => {
    // Single node workflow is not allowed and wait, start node or end node might be disconnected if no edges.
    if (nodes.length > 1 && !connectedNodeIds.has(node.id)) {
      errors.push(`Node "${node.data?.title || node.id}" is disconnected.`);
    }
  });

  if (detectCycles(edges)) {
    errors.push('Workflow contains cycles, which are not allowed.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function serializeWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
  return {
    nodes: nodes.map(n => ({
      id: n.id,
      type: n.type,
      data: n.data,
      position: n.position
    })),
    edges: edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target
    }))
  };
}
