type MemoryEntry = { value: unknown; expiresAt: number | null };

const globalStore = globalThis as unknown as { __josephDecorKv?: Map<string, MemoryEntry> };
const memory = globalStore.__josephDecorKv ?? new Map<string, MemoryEntry>();
globalStore.__josephDecorKv = memory;

function hasKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvClient() {
  const mod = await import("@vercel/kv");
  return mod.kv;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  if (hasKv()) {
    try {
      const client = await kvClient();
      const value = await client.get<T>(key);
      return value ?? null;
    } catch (error) {
      console.error("KV read failed", error);
      return null;
    }
  }
  const entry = memory.get(key);
  if (!entry) return null;
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    memory.delete(key);
    return null;
  }
  return entry.value as T;
}

export async function kvSet<T>(
  key: string,
  value: T,
  ttlSeconds?: number,
): Promise<void> {
  if (hasKv()) {
    try {
      const client = await kvClient();
      if (ttlSeconds) {
        await client.set(key, value, { ex: ttlSeconds });
      } else {
        await client.set(key, value);
      }
      return;
    } catch (error) {
      console.error("KV write failed", error);
    }
  }
  memory.set(key, {
    value,
    expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
  });
}

export async function kvDel(key: string): Promise<void> {
  if (hasKv()) {
    try {
      const client = await kvClient();
      await client.del(key);
      return;
    } catch (error) {
      console.error("KV delete failed", error);
    }
  }
  memory.delete(key);
}

export function storageMode(): "kv" | "memory" {
  return hasKv() ? "kv" : "memory";
}
