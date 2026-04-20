import React from 'react';
import { NODE_CONFIG, type NodeType } from '../../types/workflow';

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-4">Drag to add</div>
      <div className="flex flex-col gap-3">
        {(Object.keys(NODE_CONFIG) as NodeType[]).map(key => (
          <div 
            key={key}
            className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
            onDragStart={(e) => onDragStart(e, key)} 
            draggable
          >
            <span className="text-sm font-medium text-gray-700">{NODE_CONFIG[key].label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
