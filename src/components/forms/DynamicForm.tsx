import React, { useEffect, useState } from 'react';
import { FORM_CONFIG } from './formConfig';
import { getAutomations } from '../../services/api';
import { useNodes } from '../../hooks/useNodes';
import type { WorkflowNode } from '../../types/workflow';

export const DynamicForm = ({ node }: { node: WorkflowNode }) => {
  const fields = FORM_CONFIG[node.type] || [];
  const { updateNode } = useNodes();
  const [automations, setAutomations] = useState<{id: string, label: string}[]>([]);

  useEffect(() => {
    if (node.type === 'automation') {
       getAutomations().then(data => setAutomations(data));
    }
  }, [node.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateNode(node.id, {
      ...node.data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => (
         <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field.name}</label>
          {field.type === 'select' ? (
             <select
               name={field.name}
               value={(node.data as Record<string, any>)[field.name] || ''}
               onChange={handleChange}
               className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
             >
                <option value="">Select an option...</option>
                {field.name === 'actionId' && automations.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
             </select>
          ) : (
             <input
               name={field.name}
               type={field.type}
               value={(node.data as Record<string, any>)[field.name] || ''}
               onChange={handleChange}
               placeholder={`Enter ${field.name}...`}
               className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
             />
          )}
        </div>
      ))}
    </div>
  );
};
