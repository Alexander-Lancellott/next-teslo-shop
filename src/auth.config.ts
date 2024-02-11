import NextAuth, { DefaultSession, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import { User } from '@prisma/client';

import { oAuthToDbUser } from './actions/user/oAuthToDbUser';
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.data = await oAuthToDbUser(
              user.email ?? '',
              user.name ?? '',
              user.image ?? '',
            );
            break;
          case 'credentials':
            token.data = user;
            break;
        }
      }

      return token;
    },

    session({ session, token }: any) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user: Partial<User> | null = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password!)) return null;

        // Regresar el usuario sin el password
        delete user.password;
        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
