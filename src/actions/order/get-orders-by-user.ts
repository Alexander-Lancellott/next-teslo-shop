'use server';

import { revalidatePath } from 'next/cache';

import { revalidate } from '@/app/(shop)/page';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async ({ page = 1, take = 12 }) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado',
    };
  }

  const orders = await prisma.order.findMany({
    take: take,
    skip: (page - 1) * take,
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalCount = await prisma.order.count({
    where: {
      userId: session.user.id,
    },
  });

  const totalPages = Math.ceil(totalCount / take);

  revalidatePath('/orders');

  return {
    ok: true,
    currentPage: page,
    totalPages: totalPages,
    orders: orders,
  };
};
