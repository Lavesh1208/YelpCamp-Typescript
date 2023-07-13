import { Document } from 'mongoose';

export interface IReviewInput {
   rating: number;
   body: string;
}

export interface IReviewDocument extends IReviewInput, Document {
   createdAt: Date;
   updatedAt: Date;
}
