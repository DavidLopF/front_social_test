import api from './api';
import { Publication, Comment, Like, PaginatedResponse } from '../types/publication.types';

export async function getAllPublications(page = 1, limit = 10): Promise<PaginatedResponse<Publication>> {
  const response = await api.get(`/publications?page=${page}&limit=${limit}`);
  return response.data;
}

export async function getPublicationById(id: number): Promise<Publication> {
  const response = await api.get(`/publications/${id}`);
  return response.data.data;
}

export async function createPublication(data: FormData): Promise<Publication> {
  const response = await api.post('/publications', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
}

export async function updatePublication(id: number, data: { title?: string; content?: string }): Promise<Publication> {
  const response = await api.put(`/publications/${id}`, data);
  return response.data.data;
}

export async function deletePublication(id: number): Promise<void> {
  await api.delete(`/publications/${id}`);
}

export async function getPublicationsByUserId(userId: number, page = 1, limit = 10): Promise<PaginatedResponse<Publication>> {
  const response = await api.get(`/publications/user/${userId}?page=${page}&limit=${limit}`);
  return response.data;
}

export async function addComment(publicationId: number, content: string): Promise<Comment> {
  const response = await api.post(`/publications/${publicationId}/comments`, { content });
  return response.data.data;
}

export async function getPublicationComments(publicationId: number, page = 1, limit = 10): Promise<PaginatedResponse<Comment>> {
  const response = await api.get(`/publications/${publicationId}/comments?page=${page}&limit=${limit}`);
  return response.data;
}

export async function toggleLike(publicationId: number): Promise<void> {
  await api.post(`/publications/${publicationId}/like`);
}

export async function getPublicationLikes(publicationId: number, page = 1, limit = 10): Promise<PaginatedResponse<Like>> {
  const response = await api.get(`/publications/${publicationId}/likes?page=${page}&limit=${limit}`);
  return response.data;
}
