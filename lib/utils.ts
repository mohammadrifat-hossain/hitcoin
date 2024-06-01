import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  balance: number;
  userId: string;
  createdAt: Date;
}