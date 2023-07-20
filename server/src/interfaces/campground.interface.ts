import { Document, ObjectId } from 'mongoose';

export interface ICampgroundInput {
   title: string;
   price: number;
   image: string;
   description: string;
   location: string;
}

export interface ICampgroundDocument extends ICampgroundInput, Document {
   reviews: Array<Document>;
   author: Document;
   createdAt: Date;
   updatedAt: Date;
}
