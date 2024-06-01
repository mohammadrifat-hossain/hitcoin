import { ResisterUser } from "@/utils/functions/RegisterUser";
import axios from "axios";
import NextAuth, { Account, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: User | AdapterUser, account: Account | null }) {
      // console.log("user", user);
      // console.log("account", account);
      if(account?.provider === "google"){
        ResisterUser(user)
      }
      return true;
    },

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  }
})

export {handler as GET, handler as POST}