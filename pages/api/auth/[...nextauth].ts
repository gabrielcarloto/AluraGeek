import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import assert from 'node:assert';

import { ADMIN_USER } from '@utils/admin';

const ENV = getENV('GITHUB_ID', 'GITHUB_SECRET', 'NEXTAUTH_SECRET');

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
        },
      },

      authorize: (credentials) => {
        if (
          credentials?.username === ADMIN_USER.USERNAME &&
          credentials.password === ADMIN_USER.PASSWORD
        ) {
          const user: User = {
            id: '1',
            name: ADMIN_USER.NAME,
            email: ADMIN_USER.EMAIL,
          };

          return user;
        }

        return null;
      },
    }),

    GithubProvider({
      clientId: ENV.GITHUB_ID,
      clientSecret: ENV.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token['id'] = user.id;
      }

      return token;
    },

    // ? probably isnt needed
    // session: ({ session, token }) => {
    //   if (token) {
    //     session.id = token.id;
    //   }

    //   return session;
    // },
  },

  secret: ENV.NEXTAUTH_SECRET,

  jwt: {
    secret: ENV.NEXTAUTH_SECRET,
    // encrypt: true,
  },
  pages: {
    signIn: '/login',
  },
});

function getENV<T extends string>(...variables: Array<T>) {
  const envVariables: Record<string, string> = {};

  variables.forEach((v) => {
    assert(
      process.env[v] !== undefined,
      `Expected environment variable ${v} to be defined`,
    );

    envVariables[v] = process.env[v] as string;
  });

  return envVariables as Record<T, string>;
}
