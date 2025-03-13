import { IPublication, IUser } from ".";

export interface ILike {
    id: number;
    userId: number;
    publicationId: number;
    createdAt: Date;
    user?: IUser;
    publication?: IPublication;
  }