import { apiRequestPrivate } from '../utils/axiosConfig';

export const fetchAllResidenceAddresses = async (page, pageSize, search) => {
  const res = await apiRequestPrivate.get('/residenceAddresses', {
    params: {
      page,
      pageSize,
      search,
    },
  });
  return res.data;
};

export const addResidenceAddress = async (values) => {
  const res = await apiRequestPrivate.post('/residenceAddresses', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const fetchResidenceAddressById = async (id) => {
  const res = await apiRequestPrivate.get(`/residenceAddresses/${id}`);
  return res.data;
};

export const updateResidenceAddress = async (values) => {
  const { id, ...inputValues } = values;
  const res = await apiRequestPrivate.put(`/residenceAddresses/${id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteResidenceAddress = async (id) => {
  const res = await apiRequestPrivate.delete(`/residenceAddresses/${id}`);
  return res.data;
};
