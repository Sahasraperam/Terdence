import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Play } from 'lucide-react';
import type { StartNodeData } from '../types/workflow';

export function StartNode({ data, selected }: NodeProps<Node<StartNodeData>>) {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-white border-2 min-w-[150px] ${selected ? 'border-green-500' : 'border-green-200'}`}>
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-100 text-green-600">
          <Play size={16} />
        </div>
        <div className="text-sm font-bold text-gray-800">{data?.title || 'Start'}</div>
      </div>
      <div>
        <div className="text-xs text-gray-500">Workflow Trigger</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </div>
  );
}
