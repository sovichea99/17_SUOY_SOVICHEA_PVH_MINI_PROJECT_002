import { signInService } from "../service/auth.service";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const response = await signInService(credentials);
                console.log("Backend API Response:", response);
                if (response && response.payload) {
                    return {
                        id: response.payload.userId,
                        email: credentials.email,
                        name: credentials.email.split('@')[0],
                        token: response.payload.token,
                    };
                }
                return null;
            }
        })],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log("JWT Callback - Token from Backend:", user.token);
                token.accessToken = user.token;
                token.id = user.id;
                token.name = user.name || user.email;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {

            if (token && session.user) {
                session.user.id = token.id;
                session.user.accessToken = token.accessToken;
                session.user.name = token.name;
                session.user.email = token.email;
            }

            return session;
        }
    }
})