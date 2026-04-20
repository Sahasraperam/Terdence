import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EndNodeData } from '../../types/workflow';

const endSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  resolutionMode: z.enum(['success', 'failure']).optional(),
});

type EndFormValues = z.infer<typeof endSchema>;

interface Props {
  initialData: EndNodeData;
  onChange: (data: Partial<EndNodeData>) => void;
}

export function EndForm({ initialData, onChange }: Props) {
  const { register, watch, reset, formState: { errors } } = useForm<EndFormValues>({
    resolver: zodResolver(endSchema),
    defaultValues: initialData as any,
  });

  useEffect(() => {
    reset(initialData as any);
  }, [initialData.title, initialData.resolutionMode, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as Partial<EndNodeData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          {...register('title')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Mode</label>
        <select 
          {...register('resolutionMode')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 bg-white"
        >
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
    </div>
  );
}
