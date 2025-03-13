export interface Publication {
  id: number;
  title: string;
  content: string;
  image?: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email?: string;
    profileImage?: string;
  };
  receivedLikes: Like[];
  receivedComments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  publicationId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    profileImage?: string;
  };
}

export interface Like {
  id: number;
  userId: number;
  publicationId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} 