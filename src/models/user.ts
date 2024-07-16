import { PrismaClient } from "@prisma/client";
import { UserData } from "../interfaces/UserData";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const create = async (userData: User) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...userData,
      },
    });

    return newUser;
  } catch (error: any) {
    throw new Error(`Error when attempting to create user: ${error.message}`);
  }
};

export const findByEmail = async (userEmail: string | undefined) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (user) {
      return user;
    }

    return false;
  } catch (error: any) {
    throw new Error(`Error when attempting to retrieve user: ${error.message}`);
  }
};

const findById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

export default {
  create,
  findByEmail,
  findById,
};
