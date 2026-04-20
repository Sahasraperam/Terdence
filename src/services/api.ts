import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export const getAutomations = async () => {
  // Mock API delay
  await new Promise(res => setTimeout(res, 500));
  
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Doc", params: ["template"] },
    { id: "slack_message", label: "Slack Message", params: ["channel", "message"] },
  ];
};

export const simulateWorkflow = async (workflow: { nodes: WorkflowNode[]; edges: WorkflowEdge[] }) => {
  // Mock API delay
  await new Promise(res => setTimeout(res, 800));

  return {
    steps: workflow.nodes.map((n) => ({
      node: n.id,
      type: n.type,
      label: n.data.label,
      status: "executed",
    })),
  };
};
