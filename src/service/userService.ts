import api from './api';

export async function getUserPublications(userId: number, page = 1, limit = 10) {
  const response = await api.get(`/publications/user/${userId}`, {
    params: { page, limit },
  });
  return response.data;
}
