'use client';

// columns.ts
import { columns } from './columns';

// Hooks
import { useAnalyses } from '@/hooks/analyses/useAnalyses';
import { AddAnalysesRequest, useAnalysesCreate } from '@/hooks/analyses/useAnalysesCreate';
import { useAnalysesUpdate } from '@/hooks/analyses/useAnalysesUpdate';
import { useAnalysesDelete } from '@/hooks/analyses/useAnalysesDelete';
import type { Analyses } from '@/hooks/analyses/useAnalysesById';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogAnalyses } from '@/components/reusable/dialog/dialogAnalyses';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Data Table
import { AnalysesTable } from './analysesTable';

// React Tools
import { useState } from 'react';

// React Query
import { useQueryClient } from '@tanstack/react-query';

export interface AnalysesUpdateRequest {
  id: number;
  code?: string | null;
  description?: string | null;
  lead_time?: number | null;
  parameter_id?: number | null;
  method_id?: number | null;
  sample_type_id?: number | null;
}

const AnalysesManagement = () => {
  // Get data analyses
  const { data, isLoading, isError, error } = useAnalyses();

  const queryClient = useQueryClient();
  const [errors, setErrors] = useState({
    code: '',
    description: '',
    lead_time: '',
    parameter_id: '',
    method_id: '',
    sample_type_id: '',
  });

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    lead_time: null as number | null,
    parameter_id: null as number | null,
    method_id: null as number | null,
    sample_type_id: null as number | null,
  });

  //  =========== Function Dialog ==============
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Mengubah nilai menjadi angka untuk fields tertentu
    if (['lead_time', 'parameter_id', 'method_id', 'sample_type_id'].includes(name)) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }; // ✅ Fungsi baru untuk menangani perubahan dari Select

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  //  =========== Function Create ==============
  const createAnalyses = useAnalysesCreate();
  const [openModalAdd, setOpenModalAdd] = useState(false); // ✅ Fungsi baru untuk membuka modal 'add' dan mereset form

  const handleOpenAdd = () => {
    // ✅ Perbaikan: Inisialisasi dengan null, bukan 0
    setFormData({ code: '', description: '', lead_time: null, parameter_id: null, method_id: null, sample_type_id: null });
    setErrors({ code: '', description: '', lead_time: '', parameter_id: '', method_id: '', sample_type_id: '' });
    setOpenModalAdd(true);
  };

  const handleSubmit = () => {
    // ✅ Perbaikan: Periksa apakah nilai adalah null, bukan apakah > 0
    const newErrors = {
      code: formData.code ? '' : 'Code is required',
      description: formData.description ? '' : 'Description is required',
      lead_time: formData.lead_time && formData.lead_time > 0 ? '' : 'Lead time is required and must be greater than 0',
      parameter_id: formData.parameter_id ? '' : 'Parameter is required',
      method_id: formData.method_id ? '' : 'Method is required',
      sample_type_id: formData.sample_type_id ? '' : 'Sample type is required',
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== '');
    if (hasError) return; // Menyesuaikan data yang dikirimkan ke mutation

    createAnalyses.mutate(formData as AddAnalysesRequest, {
      onSuccess: () => {
        // ✅ Refresh data analyses
        queryClient.invalidateQueries({ queryKey: ['analyses'] });

        setOpenModalAdd(false); // ✅ Reset ke null
        setFormData({ code: '', description: '', lead_time: null, parameter_id: null, method_id: null, sample_type_id: null });
        setErrors({ code: '', description: '', lead_time: '', parameter_id: '', method_id: '', sample_type_id: '' });
      },
    });
  };

  const handleCancel = () => {
    setOpenModalAdd(false); // ✅ Reset ke null
    setFormData({ code: '', description: '', lead_time: null, parameter_id: null, method_id: null, sample_type_id: null });
    setErrors({ code: '', description: '', lead_time: '', parameter_id: '', method_id: '', sample_type_id: '' });
  }; //  =========== Function Edit ==============

  const updateAnalyses = useAnalysesUpdate();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedAnalysesId, setSelectedAnalysesId] = useState<number | null>(null);

  const handleOpenEdit = (analyses: Analyses) => {
    setSelectedAnalysesId(analyses.id);
    setFormData({
      code: analyses.code ?? '',
      description: analyses.description ?? '',
      lead_time: analyses.lead_time ?? null,
      parameter_id: analyses.parameter_id ?? null,
      method_id: analyses.method_id ?? null,
      sample_type_id: analyses.sample_type_id ?? null,
    });
    setOpenModalEdit(true);
  };

  const handleUpdate = () => {
    if (!selectedAnalysesId) return; // ✅ Perbaikan: Periksa apakah nilai adalah null, bukan apakah > 0

    const newErrors = {
      code: formData.code ? '' : 'Code is required',
      description: formData.description ? '' : 'Description is required',
      lead_time: formData.lead_time && formData.lead_time > 0 ? '' : 'Lead time is required and must be greater than 0',
      parameter_id: formData.parameter_id ? '' : 'Parameter is required',
      method_id: formData.method_id ? '' : 'Method is required',
      sample_type_id: formData.sample_type_id ? '' : 'Sample type is required',
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => err !== '');
    if (hasError) return; // ✅ Mengirimkan data dengan tipe yang benar

    updateAnalyses.mutate(
      {
        id: selectedAnalysesId,
        ...formData,
      } as AnalysesUpdateRequest,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['analyses'] });
          setOpenModalEdit(false); // ✅ Reset ke null
          setFormData({ code: '', description: '', lead_time: null, parameter_id: null, method_id: null, sample_type_id: null });
          setSelectedAnalysesId(null);
          setErrors({ code: '', description: '', lead_time: '', parameter_id: '', method_id: '', sample_type_id: '' });
        },
      }
    );
  };
  //  =========== Function Delete ==============

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAnalysesDelete, setSelectedAnalysesDelete] = useState<Analyses | null>(null);

  const deleteAnalyses = useAnalysesDelete();

  const handleDeleteConfirm = (analyses: Analyses) => {
    setSelectedAnalysesDelete(analyses);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (!selectedAnalysesDelete) return;

    deleteAnalyses.mutate(selectedAnalysesDelete.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['analyses'] });
        setOpenDeleteDialog(false);
        setSelectedAnalysesDelete(null);
      },
    });
  };

  // Handle load data user
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Terjadi Kesalahan</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-2 ">
        <Button onClick={handleOpenAdd} variant="default" className=" cursor-pointer">
          Add Data Analyses
        </Button>
        <DialogAnalyses
          open={openModalAdd}
          mode="add"
          onOpenChange={setOpenModalAdd}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isPending={createAnalyses.isPending}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
      </div>

      <DialogAnalyses
        open={openModalEdit}
        mode="edit"
        onOpenChange={setOpenModalEdit}
        onSubmit={handleUpdate}
        onCancel={() => setOpenModalEdit(false)}
        isPending={updateAnalyses.isPending}
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Data</DialogTitle>
          </DialogHeader>
          <p>
            Apakah Anda yakin ingin menghapus data <strong>{selectedAnalysesDelete?.description}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteAnalyses.isPending}>
              {deleteAnalyses.isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnalysesTable columns={columns(handleOpenEdit, handleDeleteConfirm)} data={data ?? []} />
    </div>
  );
};

export default AnalysesManagement;
