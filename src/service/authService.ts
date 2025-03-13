import api from './api';
import { useAuthStore } from '../store/authStore';
import { RegisterData, LoginData, UpdateUserData } from '../types/auth.types';


export async function registerUser(data: RegisterData) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('name', data.name);
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  const response = await api.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function loginUser(data: LoginData) {
  try {
    const response = await api.post('/auth/login', data);
    const { user, token } = response.data.data;
    
    if (token && user) {
      useAuthStore.getState().setToken(token);
      useAuthStore.getState().setUser(user);
      return { user, token };
    }
    
    throw new Error('Credenciales inválidas');
  } catch (error) {
    useAuthStore.getState().logout();
    throw error;
  }
}

export async function updateUserProfile(data: UpdateUserData) {
  const formData = new FormData();
  
  if (data.email) formData.append('email', data.email);
  if (data.password) formData.append('password', data.password);
  if (data.name) formData.append('name', data.name);
  if (data.profileImage) formData.append('profileImage', data.profileImage);

  const response = await api.put('/auth/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const updatedUser = response.data.data;
  useAuthStore.getState().setUser(updatedUser);
  return updatedUser;
}
