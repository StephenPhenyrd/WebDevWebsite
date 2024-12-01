import { connectMongoDB } from "@/src/app/lib/mongodb";
import User from "@/src/app/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
      },
      async authorize(credentials) {
       
        const  {username, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne( { username });
          console.log(user.password)
          console.log(user.username)
          if (user) {
            const passwordMatch = await bcrypt.compare( password, user.password )
            if (!passwordMatch) {
              return null
            }

            return user
          }
          return null;

        } catch (error) {
          console.log('error' , error)
        }
        
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
  },
};

const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
