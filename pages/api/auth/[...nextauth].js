import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },

      authorize: (credentials) => {
        if (
          credentials.username === "peypey" &&
          credentials.password === "negoney"
        ) {
          const user = {
            id: 1,
            name: "Admin",
            email: "nevergonna@giveyou.up",
          };

          return user;
        }

        return null;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encrypt: true,
  },
  pages: {
    signIn: "/login",
  },
});
