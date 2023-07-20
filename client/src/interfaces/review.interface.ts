import { IUser } from "./user.interface";

export interface IReview {
  _id: string;
  body: string;
  rating: number;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}
