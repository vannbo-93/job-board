/** @format */
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    //TODO: Lecture 99 - add CredentialsProvider
  ],
  callbacks: {
    //TODO: Lecture 100 - add jwt + session callback
  },
};
