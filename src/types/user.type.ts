import { Gender } from "@/enums/gender.enum";
import { UserStatus } from "@/enums/user-status.enum";

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dob?: Date;
  fullName: string;
  gender?: Gender;
  bio?: string;
  avatar?: string;
  status: UserStatus;
  numberOfFollowers?: number;
  numberOfFolloweds?: number;
  numberOfFavourites?: number;
  numberOfCreatedEvents?: number;
  roles: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateUserDto {
  email: string;
  phoneNumber: string;
  dob?: Date;
  fullName: string;
  password: string;
  userName?: string;
  gender?: Gender;
  bio?: string;
  avatar?: File;
}

export interface UpdateUserDto {
  id: string;
  email: string;
  phoneNumber: string;
  dob?: Date;
  fullName: string;
  userName?: string;
  gender?: Gender;
  bio?: string;
  avatar?: File;
}

export interface UpdateUserPasswordDto {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
