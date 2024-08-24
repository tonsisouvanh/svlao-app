import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addUniversity,
  deleteUniversity,
  fetchAllUniversities,
  fetchUniversityById,
  updateUniversity,
} from '../services/universityServices';
import toast from 'react-hot-toast';

export const useUniversity = () => {
  const queryClient = useQueryClient();

  const useGetUniversity = (id) => {
    return useQuery({
      queryKey: ['universities', id],
      queryFn: () => fetchUniversityById(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useGetAllUniversities = (page, pageSize, search) => {
    return useQuery({
      queryKey: ['universities', page, pageSize, search],
      queryFn: () => fetchAllUniversities(page, pageSize, search),
      select: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useAddNewUniversity = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        const res = await addUniversity(values);
        return res;
      },
      onSuccess: () => {
        toast.success('Added new university successfully');
        queryClient.invalidateQueries({ queryKey: ['universities'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add university';

        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err) => {
            toast.error(err);
          });
        } else {
          toast.error(errorMessage);
        }
      },
    });

    return mutation;
  };

  const useUpdateUniversity = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateUniversity(values);
      },
      onSuccess: (data, variables) => {
        toast.success('University updated successfully');

        // Invalidate the queries to refetch the data
        queryClient.invalidateQueries({ queryKey: ['universities'] });
        queryClient.invalidateQueries({
          queryKey: ['university', variables.id],
        }); // Refetch specific university
      },
      onError: (error) => {
        // Check for validation error message
        const errorMessage = error.response?.data?.message || 'Failed to update university';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  const useDeleteUniversity = () => {
    const mutation = useMutation({
      mutationFn: async (id) => {
        const res = await deleteUniversity(id);
        return res;
      },
      onSuccess: () => {
        toast.success('University deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['universities'] });
      },
      onError: (error) => {
        const errorMessage = error.message || error.response?.data?.message || 'Failed to add university';

        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err) => {
            toast.error(err);
          });
        } else {
          toast.error(errorMessage);
        }
      },
    });

    return mutation;
  };

  return {
    useDeleteUniversity,
    useAddNewUniversity,
    useUpdateUniversity,
    useGetUniversity,
    useGetAllUniversities,
  };
};
