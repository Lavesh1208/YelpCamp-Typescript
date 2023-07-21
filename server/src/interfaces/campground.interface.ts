import { Document, ObjectId } from 'mongoose';

interface Image {
   url: string;
   filename: string;
}

export interface ICampgroundInput {
   title: string;
   price: string;
   description: string;
   location: string;
}

export interface ICampgroundDocument extends ICampgroundInput, Document {
   images: Image[];
   reviews: Array<Document>;
   author: Document;
   createdAt: Date;
   updatedAt: Date;
}
