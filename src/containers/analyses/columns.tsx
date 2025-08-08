// columns.ts
import type { ColumnDef } from '@tanstack/react-table';

// Import interface Analyses yang telah disediakan
import type { Analyses } from '@/hooks/analyses/useAnalyses';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns = (handleOpenEdit: (analyses: Analyses) => void, onDeleteConfirm: (analyses: Analyses) => void): ColumnDef<Analyses>[] => [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'lead_time',
    header: 'Lead Time',
  },
  {
    // Menggunakan accessorKey untuk data bersarang dengan dot notation
    accessorKey: 'parameter.description',
    header: 'Parameter',
    cell: ({ row }) => {
      const analyses = row.original;
      // Mengakses langsung properti 'description' dari objek 'parameter'
      return <span>{analyses.parameter?.description || '-'}</span>;
    },
  },
  {
    // Menggunakan accessorKey untuk data bersarang dengan dot notation
    accessorKey: 'method.description',
    header: 'Method',
    cell: ({ row }) => {
      const analyses = row.original;
      // Mengakses langsung properti 'description' dari objek 'method'
      return <span>{analyses.method?.description || '-'}</span>;
    },
  },
  {
    // Menggunakan accessorKey untuk data bersarang dengan dot notation
    accessorKey: 'sample_type.description',
    header: 'Sample Type',
    cell: ({ row }) => {
      const analyses = row.original;
      // Mengakses langsung properti 'description' dari objek 'sample_type'
      return <span>{analyses.sample_type?.description || '-'}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const analyses = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleOpenEdit(analyses)} className="cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteConfirm(analyses)} className="text-red-500 focus:text-red-500 cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
