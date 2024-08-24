import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addResidenceAddress,
  deleteResidenceAddress,
  fetchAllResidenceAddresses,
  fetchResidenceAddressById,
  updateResidenceAddress,
} from '../services/residenceAddressServices';
import toast from 'react-hot-toast';

export const useResidenceAddress = () => {
  const queryClient = useQueryClient();

  const useGetResidenceAddress = (id) => {
    return useQuery({
      queryKey: ['residenceAddresses', id],
      queryFn: () => fetchResidenceAddressById(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useGetAllResidenceAddresses = (page, pageSize, search) => {
    return useQuery({
      queryKey: ['residenceAddresses', page, pageSize, search],
      queryFn: () => fetchAllResidenceAddresses(page, pageSize, search),
      select: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useAddNewResidenceAddress = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        const res = await addResidenceAddress(values);
        return res;
      },
      onSuccess: () => {
        toast.success('Added new residence address successfully');
        queryClient.invalidateQueries({ queryKey: ['residenceAddresses'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to add residence address';
        toast.error(errorMessage);
        console.error(error);
      },
    });

    return mutation;
  };

  const useUpdateResidenceAddress = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateResidenceAddress(values);
      },
      onSuccess: (data, variables) => {
        toast.success('Residence address updated successfully');
        queryClient.invalidateQueries({ queryKey: ['residenceAddresses'] });
        queryClient.invalidateQueries({ queryKey: ['residenceAddress', variables.id] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to update residence address';
        toast.error(errorMessage);
        console.error(error);
      },
    });

    return mutation;
  };

  const useDeleteResidenceAddress = () => {
    const mutation = useMutation({
      mutationFn: async (id) => {
        const res = await deleteResidenceAddress(id);
        return res;
      },
      onSuccess: () => {
        toast.success('Residence address deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['residenceAddresses'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to delete residence address';
        toast.error(errorMessage);
        console.error(error);
      },
    });

    return mutation;
  };

  return {
    useDeleteResidenceAddress,
    useAddNewResidenceAddress,
    useUpdateResidenceAddress,
    useGetResidenceAddress,
    useGetAllResidenceAddresses,
  };
};
