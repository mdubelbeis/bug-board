import type { HydratedDocument, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
}

export interface UserMethods {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;

  passwordChangedAfter(jwtTimestamp: number): boolean;
}

export type UserModel = Model<IUser, {}, UserMethods>;

export type UserDocument = HydratedDocument<IUser, UserMethods>;
