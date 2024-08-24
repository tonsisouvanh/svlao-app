import { apiRequestPrivate } from '../utils/axiosConfig';

export const fetchAllUniversities = async (page, pageSize, search) => {
  const res = await apiRequestPrivate.get('/universities', {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return res.data;
};

export const addUniversity = async (values) => {
  const res = await apiRequestPrivate.post('/universities', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const fetchUniversityById = async (id) => {
  const res = await apiRequestPrivate.get(`/universities/${id}`);
  return res.data;
};

export const updateUniversity = async (values) => {
  const { id, ...inputValues } = values;
  const res = await apiRequestPrivate.put(`/universities/${id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteUniversity = async (id) => {
  const res = await apiRequestPrivate.delete(`/universities/${id}`);
  return res.data;
};
