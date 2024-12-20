import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";
import { prisma } from "./db";
import { emailSchema, passwordSchema } from "./schema";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const emailValidation = emailSchema.safeParse(credentials.email);

        if (!emailValidation.success) {
          throw new Error("Invalid Email");
        }

        const passwordValidation = passwordSchema.safeParse(
          credentials.password
        );

        if (!passwordValidation.success) {
          throw new Error("Invalid Password");
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          const hashedPassword = await bcrypt.hash(passwordValidation.data, 10);

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: emailValidation.data,
                password: hashedPassword,
                provider: "Credentials",
              },
            });

            return newUser;
          }

          if (!user.password) {
            const authUser = await prisma.user.update({
              data: {
                password: hashedPassword,
              },
              where: {
                email: emailValidation.data,
              },
            });

            return authUser;
          }

          const passwordCheck = await bcrypt.compare(
            passwordValidation.data,
            hashedPassword
          );

          if (!passwordCheck) {
            throw new Error("Invalid User");
          }

          return user;
        } catch (e) {
          if (e instanceof PrismaClientInitializationError) {
            throw new Error("Internal server error");
          }
          console.log(e);
          throw e;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });

        if (user) {
          session.user.id = user.id;
        }
      } catch (e) {
        if (e instanceof PrismaClientInitializationError) {
          throw new Error("Interval server error");
        }
        console.log(e);
        throw e;
      }

      return session;
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });

          if (!user) {
            await prisma.user.create({
              data: {
                email: profile?.email,
                name: profile?.name || undefined,
                provider: "Google",
              },
            });
          }
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

export default authOptions;
