import { createContext, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequestPrivate } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import queryClient from '../lib/queryClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const res = await apiRequestPrivate.get('/users/session');
      return res.data;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: (error) => {
      if (error.response?.status === 401) {
        queryClient.removeQueries('authStatus');
        navigate('/sign-in');
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch user profile');
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const { emailAddress, password } = values;
      const res = await apiRequestPrivate.post('/users/login', {
        emailAddress,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      navigate('/');
      queryClient.invalidateQueries('authStatus');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequestPrivate.post('/users/logout');
      return res.data;
    },
    onSuccess: () => {
      queryClient.removeQueries('authStatus');
      navigate('/sign-in');
    },
    onError: () => {
      queryClient.removeQueries('authStatus');
      navigate('/sign-in');
    },
  });

  const value = {
    user: currentUser,
    isLoadingUser,
    userError,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
