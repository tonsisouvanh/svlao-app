import { apiRequestPrivate } from '../utils/axiosConfig';

export const fetchAllAnnouncements = async (pageNumber) => {
  const url = `/announcements?&pageNumber=${pageNumber}`;
  const res = await apiRequestPrivate.get(url);
  return res.data;
};

export const addAnnouncement = async (values) => {
  const res = await apiRequestPrivate.post('/announcements', values, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const fetchAnnouncementById = async (id) => {
  const res = await apiRequestPrivate.get(`/announcements/${id}`);
  return res.data;
};

export const updateAnnouncement = async (values) => {
  const { id, ...inputValues } = values;
  const res = await apiRequestPrivate.put(`/announcements/${id}`, inputValues, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const deleteAnnouncement = async (id) => {
  const res = await apiRequestPrivate.delete(`/announcements/${id}`);
  return res.data;
};
