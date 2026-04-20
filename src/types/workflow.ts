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

export const NODE_REGISTRY: Record<NodeType, { label: string; defaultData: Record<string, any> }> = {
  start: { label: "Start", defaultData: { label: "Start" } },
  task: { label: "Task", defaultData: { label: "Task", description: "", assignee: "", dueDate: "" } },
  approval: { label: "Approval", defaultData: { label: "Approval", approverRole: "", threshold: 1 } },
  automation: { label: "Automation", defaultData: { label: "Automation", actionId: "" } },
  end: { label: "End", defaultData: { label: "End" } },
};
