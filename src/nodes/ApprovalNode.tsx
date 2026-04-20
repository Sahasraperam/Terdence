import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { CheckCircle } from 'lucide-react';
import type { ApprovalNodeData } from '../types/workflow';

export function ApprovalNode({ data, selected }: NodeProps<Node<ApprovalNodeData>>) {
  return (
    <div className={`px-4 py-3 shadow-md rounded-md bg-white border-2 min-w-[200px] ${selected ? 'border-amber-500' : 'border-amber-200'}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-amber-500" />
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-600">
          <CheckCircle size={16} />
        </div>
        <div className="text-sm font-bold text-gray-800">{data?.title || 'Approval'}</div>
      </div>
      <div>
        <div className="text-xs font-semibold text-amber-600">{data?.approverRole ? `Role: ${data.approverRole}` : 'No role assigned'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-amber-500" />
    </div>
  );
}
