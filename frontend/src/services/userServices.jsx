import { apiRequestPrivate } from '../utils/axiosConfig';

export const fetchAllUsers = async (keyword, pageNumber) => {
  const res = await apiRequestPrivate.get('/users', {
    params: {
      keyword,
      pageNumber,
    },
  });
  return res.data;
};

export const addUser = async (values) => {
  const res = await apiRequestPrivate.post('/users/create', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const fetchUserById = async (id) => {
  const res = await apiRequestPrivate.get(`/users/${id}`);
  return res.data;
};

export const updateUserProfile = async (values) => {
  const { _id, userId, perminentAddress, updatedAt, ...inputValues } = values;
  const res = await apiRequestPrivate.put(`/users/profile/${_id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const updateUser = async (values) => {
  const id = values.id;
  const { _id, userId, perminentAddress, updatedAt, ...inputValues } = values.data;
  const res = await apiRequestPrivate.put(`/users/${id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await apiRequestPrivate.delete(`/users/${id}`);
  return res.data;
};

export const getMe = async () => {
  const res = await apiRequestPrivate.get('/users/profile');
  return res.data;
};
