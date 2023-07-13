import { IReview } from "./review.interface";

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

export interface ICampAndReview extends ICampground {
  review?: IReview[];
}
