import { IPublication, IUser } from ".";

export interface IComment {
    id: number;
    content: string;
    userId: number;
    publicationId: number;
    createdAt: Date;
    updatedAt: Date;
    user?: IUser;
    publication?: IPublication;
  } 