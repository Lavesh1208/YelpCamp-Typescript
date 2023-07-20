import { Document, ObjectId } from 'mongoose';

export interface IUserInput {
   name: string;
   email: string;
   password: string;
}

export interface IUserDocument extends IUserInput, Document {
   author: ObjectId;
   user: Array<ObjectId>;
   createdAt: Date;
   updatedAt: Date;
   getJWTToken(): string;
   comparePassword(candidatePassword: string): Promise<Boolean>;
}
