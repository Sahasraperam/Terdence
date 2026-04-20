import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export type StartNodeData = {
  title: string;
  metadata: Record<string, string>;
};

export type TaskNodeData = {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields?: Record<string, string>;
};

export type ApprovalNodeData = {
  title: string;
  approverRole: string;
  timeoutDays?: number;
};

export type AutomatedNodeData = {
  title: string;
  actionId: string;
  params: Record<string, any>;
};

export type EndNodeData = {
  title: string;
  resolutionMode: 'success' | 'failure';
};

export type WorkflowNode =
  | Node<StartNodeData, 'start'>
  | Node<TaskNodeData, 'task'>
  | Node<ApprovalNodeData, 'approval'>
  | Node<AutomatedNodeData, 'automated'>
  | Node<EndNodeData, 'end'>;

export type WorkflowEdge = Edge;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
