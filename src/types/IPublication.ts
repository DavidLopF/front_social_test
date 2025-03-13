import { IComment, ILike, IUser} from ".";


export interface IPublication {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    author?: IUser;
    receivedLikes?: ILike[];
    receivedComments?: IComment[];
  }
  