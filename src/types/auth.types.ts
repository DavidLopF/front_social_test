export interface RegisterData {
  email: string;
  password: string;
  name: string;
  profileImage?: File;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  email?: string;
  password?: string;
  name?: string;
  profileImage?: File;
} 