import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "node:crypto";
import { kvGet, kvSet } from "./kv";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(derived, expected);
}

function normalise(email: string): string {
  return email.trim().toLowerCase();
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  return kvGet<StoredUser>(`user:${normalise(email)}`);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<StoredUser> {
  const email = normalise(input.email);
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("An account with that email already exists");
  }
  const user: StoredUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  await kvSet(`user:${email}`, user);
  return user;
}

export async function checkUserCredentials(
  email: string,
  password: string,
): Promise<StoredUser | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  return verifyPassword(password, user.passwordHash) ? user : null;
}

export async function upsertOAuthUser(input: {
  name: string | null;
  email: string;
}): Promise<StoredUser> {
  const existing = await getUserByEmail(input.email);
  if (existing) return existing;
  const user: StoredUser = {
    id: randomUUID(),
    name: input.name ?? input.email.split("@")[0],
    email: normalise(input.email),
    passwordHash: "",
    createdAt: new Date().toISOString(),
  };
  await kvSet(`user:${user.email}`, user);
  return user;
}
