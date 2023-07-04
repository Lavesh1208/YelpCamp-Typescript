import { Document, ObjectId } from 'mongoose';

export interface ICampgroundInput {
   title: string;
   price: string;
   description: string;
   location: string;
}

export interface ICampground extends ICampgroundInput, Document {
   createdAt: Date;
   updatedAt: Date;
}

export interface ICampground {
   _id: ObjectId;
}
