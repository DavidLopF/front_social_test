import { IComment, ILike, IPublication } from ".";

export interface IUser {
    id?: number;
    email: string;
    password: string;
    name: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
    publications?: IPublication[];
    likedPosts?: ILike[];
    commentedPosts?: IComment[];
  }
  
  