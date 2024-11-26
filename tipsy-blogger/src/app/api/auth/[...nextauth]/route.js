import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your user authentication logic here
        const user = { id: "1", name: "Admin" };

        if (user) {
          return user; // Return user object if successful
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for stateless authentication
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Redirect here if not authenticated
  },
};

const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
