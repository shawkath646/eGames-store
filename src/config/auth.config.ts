import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import CloudBurstLab from "next-auth-provider-cloudburst-lab";
import getUserByEmail from "@/actions/database/auth/getUserByEmail";
import createUser from "@/actions/database/auth/createUser";

export const authConfig = {
    providers: [
        Google,
        CloudBurstLab
    ],
    callbacks: {
        async jwt({ token, profile }) {
            if (profile) {
                const {
                    given_name,
                    family_name,
                    name,
                    email,
                    picture
                } = profile;

                if (email) {
                    let existingUser = await getUserByEmail(email);
                    if (!existingUser) existingUser = await createUser({ email, name, picture });

                    token.id = existingUser.id;
                    token.firstName = given_name;
                    token.lastName = family_name;
                    token.role = existingUser.role;
                    token.totalSpent = existingUser.totalSpent;
                    token.joinedOn = existingUser.joinedOn;
                    token.image = existingUser.image;
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.firstName = token.firstName as string;
            session.user.lastName = token.lastName as string;
            session.user.role = token.role as string;
            session.user.totalSpent = token.totalSpent as number;
            session.user.joinedOn = token.joinedOn as Date;
            session.user.image = token.image as string;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthConfig;
