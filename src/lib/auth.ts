import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { signinSchema } from "./schemas";
import { checkUserCredentials, upsertOAuthUser } from "./users";
import { verifyRecaptchaToken } from "./recaptcha";

const googleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);

const providers: NextAuthConfig["providers"] = [
  ...(googleEnabled
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
  Credentials({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      recaptchaToken: { label: "reCAPTCHA", type: "text" },
    },
    authorize: async (credentials) => {
      const parsed = signinSchema.safeParse({
        email: credentials?.email,
        password: credentials?.password,
      });
      if (!parsed.success) return null;

      const recaptcha = await verifyRecaptchaToken(
        typeof credentials?.recaptchaToken === "string"
          ? credentials.recaptchaToken
          : undefined,
        "signin",
      );
      if (recaptcha.mode === "verified" && !recaptcha.success) return null;

      const user = await checkUserCredentials(parsed.data.email, parsed.data.password);
      if (!user) return null;

      return { id: user.id, name: user.name, email: user.email };
    },
  }),
];

export const authConfig: NextAuthConfig = {
  trustHost: true,
  secret:
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
      ? "joseph-decor-development-secret"
      : undefined),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = (token.id as string) ?? token.sub ?? "";
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          await upsertOAuthUser({ name: user.name ?? null, email: user.email });
        } catch {
          return false;
        }
      }
      return true;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
