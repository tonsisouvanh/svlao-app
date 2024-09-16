import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addUser,
  deleteUser,
  fetchAllUsers,
  fetchUserById,
  getMe,
  updateUser,
  updateUserProfile,
} from '../services/userServices';
import toast from 'react-hot-toast';

export const useUser = () => {
  const queryClient = useQueryClient();

  // ====================================================== //
  // ===================== Get a user ===================== //
  // =======================ADMIN======================== //
  const useGetUser = (id) => {
    return useQuery({
      queryKey: ['users', id],
      queryFn: () => fetchUserById(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  // ====================================================== //
  // ================== Get user profile ================== //
  // ====================================================== //
  const useGetMe = () => {
    return useQuery({
      queryKey: ['me'],
      queryFn: () => getMe(),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  // ====================================================== //
  // ==================== Get all users =================== //
  // =======================ADMIN======================== //
  const useGetAllUsers = (keyword, pageNumber) => {
    return useQuery({
      queryKey: ['users', keyword, pageNumber],
      queryFn: () => fetchAllUsers(keyword, pageNumber),
      select: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  // ====================================================== //
  // ==================== Create new user =================== //
  // =======================ADMIN======================== //
  const useAddNewUser = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        const res = await addUser(values);
        return res;
      },
      onSuccess: () => {
        toast.success('Added new user successfully');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to add user';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  // ====================================================== //
  // =================== Update profile =================== //
  // =============================================== //
  const useUpdateUserProfile = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateUserProfile(values);
      },
      onSuccess: (data, variables) => {
        toast.success('User updated successfully');
        // queryClient.invalidateQueries({ queryKey: ['users'] });
        // queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to update user';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  // ====================================================== //
  // =================== Update user =================== //
  // =====================ADMIN=================== //
  const useUpdateUser = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateUser(values);
      },
      onSuccess: (data, variables) => {
        toast.success('User updated successfully');
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to update user';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  // ====================================================== //
  // ================= Delete user (admin) ================ //
  // ====================================================== //
  const useDeleteUser = () => {
    const mutation = useMutation({
      mutationFn: async (id) => {
        const res = await deleteUser(id);
        return res;
      },
      onSuccess: () => {
        toast.success('User deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to delete user';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  return {
    useDeleteUser,
    useAddNewUser,
    useUpdateUserProfile,
    useGetUser,
    useGetAllUsers,
    useGetMe,
    useUpdateUser,
  };
};
