import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { NODE_CONFIG, type WorkflowNodeData, type NodeType } from '../../types/workflow';

function BaseNode({ data, selected, type }: NodeProps<Node<WorkflowNodeData>> & { type: NodeType }) {
  return (
    <div className={`px-4 py-3 shadow-md rounded-md bg-white border-2 min-w-[200px] ${selected ? 'border-primary' : 'border-gray-200'}`}>
      {type !== 'start' && <Handle type="target" position={Position.Top} className="w-3 h-3 bg-gray-500" />}
      <div className="font-bold text-sm border-b border-gray-100 pb-2 mb-2 text-gray-800">
        {data.label || NODE_CONFIG[type].label}
      </div>
      
      <div className="flex flex-col gap-1 mt-2 text-xs text-gray-600">
        {Object.entries(data).map(([key, val]) => {
           if (key === 'label') return null;
           return <div key={key} className="capitalize flex justify-between">
             <span className="font-medium text-gray-500">{key}:</span>
             <span className="truncate max-w-[100px]">{String(val)}</span>
           </div>;
        })}
      </div>

      {type !== 'end' && <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-gray-500" />}
    </div>
  );
}

export const nodeTypes = {
  start: (props: any) => <BaseNode {...props} type="start" />,
  task: (props: any) => <BaseNode {...props} type="task" />,
  approval: (props: any) => <BaseNode {...props} type="approval" />,
  automation: (props: any) => <BaseNode {...props} type="automation" />,
  end: (props: any) => <BaseNode {...props} type="end" />,
};
