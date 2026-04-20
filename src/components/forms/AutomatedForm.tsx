import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AutomatedNodeData } from '../../types/workflow';

const automatedSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  actionId: z.string().optional(),
  params: z.record(z.string(), z.any()).optional(),
});

type AutomatedFormValues = z.infer<typeof automatedSchema>;

interface Props {
  initialData: AutomatedNodeData;
  onChange: (data: Partial<AutomatedNodeData>) => void;
}

interface Automation {
  id: string;
  label: string;
  params: string[];
}

export function AutomatedForm({ initialData, onChange }: Props) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);

  const { register, watch, reset, formState: { errors } } = useForm<AutomatedFormValues>({
    resolver: zodResolver(automatedSchema),
    defaultValues: initialData as any,
  });

  const selectedActionId = watch('actionId');
  const selectedAutomation = automations.find(a => a.id === selectedActionId);

  useEffect(() => {
    fetch('/automations')
      .then(res => res.json())
      .then(data => {
        setAutomations(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    reset(initialData as any);
  }, [initialData.title, initialData.actionId, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as Partial<AutomatedNodeData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading automations...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          {...register('title')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
        <select 
          {...register('actionId')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
        >
          <option value="">Select an action...</option>
          {automations.map(action => (
            <option key={action.id} value={action.id}>{action.label}</option>
          ))}
        </select>
      </div>

      {selectedAutomation && selectedAutomation.params.length > 0 && (
        <div className="border border-gray-200 p-3 rounded-md bg-gray-50 flex flex-col gap-3">
          <div className="text-xs font-semibold text-gray-600 uppercase">Action Parameters</div>
          {selectedAutomation.params.map(param => (
            <div key={param}>
              <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{param.replace('_', ' ')}</label>
              <input 
                {...register(`params.${param}`)} 
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
