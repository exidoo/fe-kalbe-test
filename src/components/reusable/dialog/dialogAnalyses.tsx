// components/DialogAddEditAnalyses.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// React
import type { FC, ChangeEvent } from 'react';

// Import hooks untuk mengambil data relasi
import { useParameters } from '@/hooks/parameters/useParameters';
import { useMethods } from '@/hooks/methods/useMethods';
import { useSampleTypes } from '@/hooks/sample-types/useSampleTypes';

interface Props {
  open: boolean;
  mode: 'add' | 'edit';
  onOpenChange: (value: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isPending: boolean;
  formData: {
    code?: string;
    description?: string;
    lead_time?: number | null;
    parameter_id?: number | null;
    method_id?: number | null;
    sample_type_id?: number | null;
  };
  errors: {
    code?: string;
    description?: string;
    lead_time?: string;
    parameter_id?: string;
    method_id?: string;
    sample_type_id?: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const DialogAnalyses: FC<Props> = ({ open, mode, onOpenChange, onSubmit, onCancel, isPending, formData, errors, onChange, onSelectChange }) => {
  // Ambil data relasi dari hooks
  const { data: parameters, isLoading: isLoadingParameters } = useParameters();
  const { data: methods, isLoading: isLoadingMethods } = useMethods();
  const { data: sampleTypes, isLoading: isLoadingSampleTypes } = useSampleTypes();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Analyses Baru' : 'Edit Analyses'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label className="mb-2">Code</Label>
            <Input name="code" value={formData.code || ''} onChange={onChange} />
            {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code}</p>}
          </div>
          <div>
            <Label className="mb-2">Description</Label>
            <Input name="description" value={formData.description || ''} onChange={onChange} />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
          <div>
            <Label className="mb-2">Lead Time</Label>
            <Input name="lead_time" value={formData.lead_time || ''} onChange={onChange} type="number" />
            {errors.lead_time && <p className="text-sm text-red-500 mt-1">{errors.lead_time}</p>}
          </div>

          {/* Select untuk Parameter */}
          <div>
            <Label className="mb-2">Parameter</Label>
            <Select onValueChange={(value) => onSelectChange('parameter_id', value)} value={formData.parameter_id?.toString()}>
              <SelectTrigger disabled={isLoadingParameters} className="w-full">
                <SelectValue placeholder="Pilih Parameter" />
              </SelectTrigger>
              <SelectContent>
                {parameters?.map((p) => (
                  <SelectItem key={p.id} value={p.id.toString()}>
                    {p.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.parameter_id && <p className="text-sm text-red-500 mt-1">{errors.parameter_id}</p>}
          </div>

          {/* Select untuk Method */}
          <div>
            <Label className="mb-2">Method</Label>
            <Select onValueChange={(value) => onSelectChange('method_id', value)} value={formData.method_id?.toString()}>
              <SelectTrigger disabled={isLoadingMethods} className="w-full">
                <SelectValue placeholder="Pilih Method" />
              </SelectTrigger>
              <SelectContent>
                {methods?.map((m) => (
                  <SelectItem key={m.id} value={m.id.toString()}>
                    {m.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.method_id && <p className="text-sm text-red-500 mt-1">{errors.method_id}</p>}
          </div>

          {/* Select untuk Sample Type */}
          <div>
            <Label className="mb-2">Sample Type</Label>
            <Select onValueChange={(value) => onSelectChange('sample_type_id', value)} value={formData.sample_type_id?.toString()}>
              <SelectTrigger disabled={isLoadingSampleTypes} className="w-full">
                <SelectValue placeholder="Pilih Tipe Sampel" />
              </SelectTrigger>
              <SelectContent>
                {sampleTypes?.map((st) => (
                  <SelectItem key={st.id} value={st.id.toString()}>
                    {st.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sample_type_id && <p className="text-sm text-red-500 mt-1">{errors.sample_type_id}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onCancel} className="cursor-pointer" variant="outline">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending} className="cursor-pointer">
            {isPending ? 'Saving...' : mode === 'add' ? 'Save' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
