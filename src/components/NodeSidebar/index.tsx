import React from 'react';
import type { NodeType } from '../../types/workflow';
import { Play, ClipboardList, CheckCircle, Zap, SquareSquare } from 'lucide-react';

export function NodeSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-4">Drag to add</div>
      <div className="flex flex-col gap-3">
        <div 
          className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
          onDragStart={(e) => onDragStart(e, 'start')} 
          draggable
        >
          <Play size={18} className="text-green-600" />
          <span className="text-sm font-medium text-gray-700">Start</span>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
          onDragStart={(e) => onDragStart(e, 'task')} 
          draggable
        >
          <ClipboardList size={18} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Task</span>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
          onDragStart={(e) => onDragStart(e, 'approval')} 
          draggable
        >
          <CheckCircle size={18} className="text-amber-600" />
          <span className="text-sm font-medium text-gray-700">Approval</span>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
          onDragStart={(e) => onDragStart(e, 'automated')} 
          draggable
        >
          <Zap size={18} className="text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Automated</span>
        </div>
        
        <div 
          className="flex items-center gap-3 p-3 border border-gray-200 shadow-sm rounded cursor-grab hover:bg-gray-50 active:cursor-grabbing"
          onDragStart={(e) => onDragStart(e, 'end')} 
          draggable
        >
          <SquareSquare size={18} className="text-zinc-600" />
          <span className="text-sm font-medium text-gray-700">End</span>
        </div>
      </div>
    </aside>
  );
}
