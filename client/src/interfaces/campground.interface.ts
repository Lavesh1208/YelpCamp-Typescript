import { IReview } from "./review.interface";
import { IUser } from "./user.interface";

export interface ICampground {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICampReviewAndAuthor extends ICampground {
  reviews: IReview[];
  author: IUser;
}
