import type { HydratedDocument } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type UserDocument = HydratedDocument<IUser>;
