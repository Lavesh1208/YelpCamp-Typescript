import { IReview } from "./review.interface";
import { IUser } from "./user.interface";

interface Image {
  _id: string;
  url: string;
  filename: string;
}

export interface ICampground {
  _id: string;
  title: string;
  price: number;
  images: Image[];
  description: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICampReviewAndAuthor extends ICampground {
  reviews: IReview[];
  author: IUser;
}
