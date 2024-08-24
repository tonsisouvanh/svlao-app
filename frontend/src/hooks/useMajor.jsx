import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addMajor, deleteMajor, fetchAllMajors, fetchMajorById, updateMajor } from '../services/majorServices';
import toast from 'react-hot-toast';

export const useMajor = () => {
  const queryClient = useQueryClient();

  const useGetMajor = (id) => {
    return useQuery({
      queryKey: ['majors', id],
      queryFn: () => fetchMajorById(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useGetAllMajors = (page, pageSize, search) => {
    return useQuery({
      queryKey: ['majors', page, pageSize, search],
      queryFn: () => fetchAllMajors(page, pageSize, search),
      select: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useAddNewMajor = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        const res = await addMajor(values);
        return res;
      },
      onSuccess: () => {
        toast.success('Added new major successfully');
        queryClient.invalidateQueries({ queryKey: ['majors'] });
      },
      onError: (error) => {
        // Check for validation error message
        const errorMessage = error.response?.data?.message || 'Failed to update major';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  const useUpdateMajor = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateMajor(values);
      },
      onSuccess: (data, variables) => {
        toast.success('Major updated successfully');

        // Invalidate the queries to refetch the data
        queryClient.invalidateQueries({ queryKey: ['majors'] });
        queryClient.invalidateQueries({
          queryKey: ['major', variables.id],
        }); // Refetch specific major
      },
      onError: (error) => {
        // Check for validation error message
        const errorMessage = error.response?.data?.message || 'Failed to update major';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  const useDeleteMajor = () => {
    const mutation = useMutation({
      mutationFn: async (id) => {
        const res = await deleteMajor(id);
        return res;
      },
      onSuccess: () => {
        toast.success('Major deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['majors'] });
      },
      onError: (error) => {
        // Check for validation error message
        const errorMessage = error.response?.data?.message || 'Failed to update major';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  return {
    useDeleteMajor,
    useAddNewMajor,
    useUpdateMajor,
    useGetMajor,
    useGetAllMajors,
  };
};
