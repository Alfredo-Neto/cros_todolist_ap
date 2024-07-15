import { PrismaClient } from '@prisma/client';
import { UserData } from '../interfaces/UserData'

const prisma = new PrismaClient();

const create = async (userData: UserData) => {
	try {
    const newUser = await prisma.user.create({
      data: {
        ...userData
      },
    });

    return newUser;
  } catch (error: any) {
    throw new Error(`Error when attempting to create user: ${error.message}`);
  }
}

const findByEmail = async (userEmail: string) => {
	try {
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (user) {
      return user;
    }

    return false;
  } catch (error: any) {
    throw new Error(`Error when attempting to retrieve user: ${error.message}`);
  }
}

const findById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export default {
  create,
  findByEmail,
  findById
}