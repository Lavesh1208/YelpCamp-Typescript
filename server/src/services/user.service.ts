import { FilterQuery } from 'mongoose';
import { IUserDocument, IUserInput } from '../interfaces/user.interface';
import User from '../models/user.model';

export async function createUser(input: IUserInput) {
   return await User.create(input);
}

export async function getUser(query: FilterQuery<IUserDocument>) {
   return await User.findOne(query);
}

export async function getUserById(id: string) {
   return await User.findById(id);
}
