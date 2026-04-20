import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { ClipboardList } from 'lucide-react';
import type { TaskNodeData } from '../types/workflow';

export function TaskNode({ data, selected }: NodeProps<Node<TaskNodeData>>) {
  return (
    <div className={`px-4 py-3 shadow-md rounded-md bg-white border-2 min-w-[200px] ${selected ? 'border-blue-500' : 'border-blue-200'}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600">
          <ClipboardList size={16} />
        </div>
        <div className="text-sm font-bold text-gray-800">{data?.title || 'Manual Task'}</div>
      </div>
      <div>
        <div className="text-xs text-gray-600 line-clamp-1">{data?.description || 'No description'}</div>
        <div className="text-xs font-semibold text-blue-600 mt-2">{data?.assignee ? `Assignee: ${data.assignee}` : 'Unassigned'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
}
