import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Zap } from 'lucide-react';
import type { AutomatedNodeData } from '../types/workflow';

export function AutomatedNode({ data, selected }: NodeProps<Node<AutomatedNodeData>>) {
  return (
    <div className={`px-4 py-3 shadow-md rounded-md bg-white border-2 min-w-[200px] ${selected ? 'border-purple-500' : 'border-purple-200'}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-purple-500" />
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600">
          <Zap size={16} />
        </div>
        <div className="text-sm font-bold text-gray-800">{data?.title || 'Automated Action'}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">{data?.actionId ? `Action: ${data.actionId}` : 'No Action Chosen'}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-500" />
    </div>
  );
}
