import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { SquareSquare } from 'lucide-react';
import type { EndNodeData } from '../types/workflow';

export function EndNode({ data, selected }: NodeProps<Node<EndNodeData>>) {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-white border-2 min-w-[150px] ${selected ? 'border-zinc-500' : 'border-zinc-200'}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-zinc-500" />
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-zinc-100 text-zinc-600">
          <SquareSquare size={16} />
        </div>
        <div className="text-sm font-bold text-gray-800">{data?.title || 'End'}</div>
      </div>
      <div>
        <div className="text-xs font-semibold text-zinc-600">{data?.resolutionMode ? `Mode: ${data.resolutionMode}` : 'Resolution mode'}</div>
      </div>
    </div>
  );
}
