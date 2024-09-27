
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google, GitHub],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /dashboard after login
      return baseUrl + '/dashboard'
    },
  },

})