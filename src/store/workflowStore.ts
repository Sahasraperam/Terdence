import { create } from "zustand";
import {
  type Connection,
  type EdgeChange,
  type NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;

  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  addNode: (node: WorkflowNode) => void;
  updateNode: (id: string, data: any) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string | null) => void;

  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<WorkflowEdge>[]) => void;
  onConnect: (connection: Connection) => void;
}

const initialNodes: WorkflowNode[] = [
  {
    id: "node_1",
    type: "start",
    position: { x: 250, y: 50 },
    data: { label: "HR Onboarding Start" },
  },
  {
    id: "node_2",
    type: "task",
    position: { x: 250, y: 150 },
    data: { label: "Submit Docs", description: "Upload ID and Tax forms", assignee: "New Hire", dueDate: "" },
  },
  {
    id: "node_3",
    type: "approval",
    position: { x: 250, y: 300 },
    data: { label: "HR Review", approverRole: "HR Manager", threshold: 1 },
  },
  {
    id: "node_4",
    type: "automation",
    position: { x: 250, y: 450 },
    data: { label: "Send Welcome Email", actionId: "send_email" },
  },
  {
    id: "node_5",
    type: "end",
    position: { x: 250, y: 600 },
    data: { label: "Onboarding Complete" },
  }
] as WorkflowNode[];

const initialEdges: WorkflowEdge[] = [
  { id: "e1-2", source: "node_1", target: "node_2" },
  { id: "e2-3", source: "node_2", target: "node_3" },
  { id: "e3-4", source: "node_3", target: "node_4" },
  { id: "e4-5", source: "node_4", target: "node_5" },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data } : n
      ),
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  selectNode: (id) => set({ selectedNodeId: id }),

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[] }),

  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  onConnect: (connection) =>
    set({ edges: addEdge(connection, get().edges) }),
}));
