'use server';

import { User } from '@prisma/client';

import prisma from '@/lib/prisma';

const generatePassword = () => {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const oAuthToDbUser = async (
  oAuthEmail: string,
  oAuthName: string,
  oAuthImage: string,
) => {
  const user: Partial<User> | null = await prisma.user.findUnique({
    where: { email: oAuthEmail },
  });

  if (user) {
    delete user.password;
    return { ...user };
  }

  const password = generatePassword();

  const newUser: Partial<User> = await prisma.user.create({
    data: {
      email: oAuthEmail,
      name: oAuthName,
      image: oAuthImage,
      password,
    },
  });

  delete newUser.password;

  return { ...newUser };
};
