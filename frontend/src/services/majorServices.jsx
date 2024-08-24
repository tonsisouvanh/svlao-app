import { apiRequestPrivate } from '../utils/axiosConfig';

export const fetchAllMajors = async (page, pageSize, search) => {
  const res = await apiRequestPrivate.get('/majors', {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return res.data;
};

export const addMajor = async (values) => {
  const res = await apiRequestPrivate.post('/majors', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const fetchMajorById = async (id) => {
  const res = await apiRequestPrivate.get(`/majors/${id}`);
  return res.data;
};

export const updateMajor = async (values) => {
  const { id, ...inputValues } = values;
  const res = await apiRequestPrivate.put(`/majors/${id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteMajor = async (id) => {
  const res = await apiRequestPrivate.delete(`/majors/${id}`);
  return res.data;
};
