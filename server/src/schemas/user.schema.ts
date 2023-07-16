import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
   body: object({
      name: string({
         required_error: 'Name is required',
      }),
      email: string({
         required_error: 'Email is required',
      }).email(),
      password: string({
         required_error: 'Password is required',
      }),
   }),
});

export const loginUserSchema = object({
   body: object({
      email: string({
         required_error: 'Email is required',
      }).email(),
      password: string({
         required_error: 'Password is required',
      }),
   }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
