import { Document } from 'mongoose';

export interface ICampgroundInput {
   title: string;
   price: number;
   description: string;
   location: string;
}

export interface ICampgroundDocument extends ICampgroundInput, Document {
   createdAt: Date;
   updatedAt: Date;
}
