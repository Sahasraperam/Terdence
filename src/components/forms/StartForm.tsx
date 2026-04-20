import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { StartNodeData } from '../../types/workflow';

const startSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type StartFormValues = z.infer<typeof startSchema>;

interface Props {
  initialData: StartNodeData;
  onChange: (data: Partial<StartNodeData>) => void;
}

export function StartForm({ initialData, onChange }: Props) {
  const { register, watch, reset, formState: { errors } } = useForm<StartFormValues>({
    resolver: zodResolver(startSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData.title, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as Partial<StartNodeData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          {...register('title')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div className="text-xs text-gray-500">
        Start nodes initiate the workflow. Additional metadata configurations can be added here.
      </div>
    </div>
  );
}
