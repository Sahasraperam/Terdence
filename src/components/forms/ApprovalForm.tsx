import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ApprovalNodeData } from '../../types/workflow';

const approvalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  approverRole: z.string().optional(),
  timeoutDays: z.coerce.number().optional(),
});

type ApprovalFormValues = z.infer<typeof approvalSchema>;

interface Props {
  initialData: ApprovalNodeData;
  onChange: (data: Partial<ApprovalNodeData>) => void;
}

export function ApprovalForm({ initialData, onChange }: Props) {
  const { register, watch, reset, formState: { errors } } = useForm<ApprovalFormValues>({
    resolver: zodResolver(approvalSchema as any),
    defaultValues: initialData as any,
  });

  useEffect(() => {
    reset(initialData as any);
  }, [initialData.title, initialData.approverRole, initialData.timeoutDays, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as Partial<ApprovalNodeData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          {...register('title')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Approver Role</label>
        <select 
          {...register('approverRole')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
        >
          <option value="">Select a role...</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (Days)</label>
        <input 
          type="number"
          min="1"
          {...register('timeoutDays')} 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}
