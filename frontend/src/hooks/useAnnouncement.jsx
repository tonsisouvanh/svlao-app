import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addAnnouncement,
  deleteAnnouncement,
  fetchAllAnnouncements,
  fetchAnnouncementById,
  updateAnnouncement,
} from '../services/announcementServices';
import toast from 'react-hot-toast';

export const useAnnouncement = () => {
  const queryClient = useQueryClient();

  const useGetAnnouncement = (id) => {
    return useQuery({
      queryKey: ['announcements', id],
      queryFn: () => fetchAnnouncementById(id),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useGetAllAnnouncements = (pageNumber, search) => {
    return useQuery({
      queryKey: ['announcements', pageNumber, search],
      queryFn: () => fetchAllAnnouncements(pageNumber, search),
      select: (data) => data,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });
  };

  const useAddNewAnnouncement = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        const res = await addAnnouncement(values);
        return res;
      },
      onSuccess: () => {
        toast.success('Added new announcement successfully');
        queryClient.invalidateQueries({ queryKey: ['announcements'] });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to add announcement';

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

  const useUpdateAnnouncement = () => {
    const mutation = useMutation({
      mutationFn: async (values) => {
        await updateAnnouncement(values);
      },
      onSuccess: (data, variables) => {
        toast.success('Announcement updated successfully');

        // Invalidate the queries to refetch the data
        queryClient.invalidateQueries({ queryKey: ['announcements'] });
        queryClient.invalidateQueries({
          queryKey: ['announcement', variables.id],
        }); // Refetch specific announcement
      },
      onError: (error) => {
        // Check for validation error message
        const errorMessage = error.response?.data?.message || 'Failed to update announcement';
        toast.error(errorMessage);
      },
    });

    return mutation;
  };

  const useDeleteAnnouncement = () => {
    const mutation = useMutation({
      mutationFn: async (id) => {
        const res = await deleteAnnouncement(id);
        return res;
      },
      onSuccess: () => {
        toast.success('Announcement deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['announcements'] });
      },
      onError: (error) => {
        const errorMessage = error.message || error.response?.data?.message || 'Failed to delete announcement';

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
    useDeleteAnnouncement,
    useAddNewAnnouncement,
    useUpdateAnnouncement,
    useGetAnnouncement,
    useGetAllAnnouncements,
  };
};
