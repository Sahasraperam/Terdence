import type { Node, Edge } from '@xyflow/react';

export type NodeType =
  | "start"
  | "task"
  | "approval"
  | "automation"
  | "end";

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole?: string;
  threshold?: number;
}

export interface AutomationNodeData extends BaseNodeData {
  actionId?: string;
  params?: Record<string, any>;
}

export type WorkflowNodeData =
  | BaseNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomationNodeData;

export type WorkflowNode = Node<WorkflowNodeData, NodeType>;
export type WorkflowEdge = Edge;

export const NODE_CONFIG: Record<NodeType, { label: string }> = {
  start: { label: "Start Node" },
  task: { label: "Task Node" },
  approval: { label: "Approval Node" },
  automation: { label: "Automation Node" },
  end: { label: "End Node" },
};
