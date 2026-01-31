import crypto from "crypto";
import { prisma } from "./prisma";

const AUTH_SECRET = process.env.AUTH_SECRET;

type TokenPayload = {
  sub: number;
  email: string;
  role: "ADMIN" | "CUSTOMER";
  exp: number;
};

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function base64UrlEncode(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input: string): string {
  const padLength = (4 - (input.length % 4)) % 4;
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  return Buffer.from(padded, "base64").toString("utf8");
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 100_000;
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("hex");
  return `${iterations}$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3) return false;
  const [iterStr, salt, originalHash] = parts;
  const iterations = Number(iterStr);
  if (!iterations || !salt || !originalHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("hex");

  const originalBuffer = Buffer.from(originalHash, "hex");
  const hashBuffer = Buffer.from(hash, "hex");
  if (originalBuffer.length !== hashBuffer.length) return false;
  return crypto.timingSafeEqual(originalBuffer, hashBuffer);
}

function signToken(payload: TokenPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const data = `${headerEncoded}.${payloadEncoded}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(data)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  return `${data}.${signature}`;
}

function verifyToken(token: string): TokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerEncoded, payloadEncoded, signature] = parts;
  const data = `${headerEncoded}.${payloadEncoded}`;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(data)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  if (signature !== expectedSignature) return null;

  try {
    const json = base64UrlDecode(payloadEncoded);
    const payload = JSON.parse(json) as TokenPayload;
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function createSessionToken(params: {
  userId: number;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}): string {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    sub: params.userId,
    email: params.email,
    role: params.role,
    exp: nowSeconds + TOKEN_TTL_SECONDS,
  };
  return signToken(payload);
}

export function parseSessionToken(token: string | undefined | null): TokenPayload | null {
  if (!token) return null;
  return verifyToken(token);
}

export async function getUserFromToken(token: string | undefined | null) {
  const payload = parseSessionToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return null;
  return user;
}
