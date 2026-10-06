import { webcrypto } from "node:crypto";
import { readFile } from "node:fs/promises";

globalThis.crypto ??= webcrypto;
const bundle = await readFile(new URL("../dist/index.js", import.meta.url), "utf8");
const module = await import("data:text/javascript;base64," + Buffer.from(bundle).toString("base64"));
const { default: worker, AuthSessionDO } = module;
const ORIGIN = "https://clickjim.com";
const API = "/api/projects/audio";
const MP3 = new Uint8Array([0x49, 0x44, 0x33, 4, 0, 0, 0, 0, 0, 0, 0xff, 0xfb, 0x90, 0, 1, 2, 3, 4]);

export class MemoryBucket {
  constructor() { this.objects = new Map(); this.fail = false; }
  async put(key, value, options) {
    if (this.fail) throw new Error("Simulated storage failure");
    const bytes = new Uint8Array(await value.arrayBuffer());
    const object = { key, size: bytes.length, uploaded: new Date(), httpEtag: '"test-etag"', ...options, bytes };
    this.objects.set(key, object);
    return object;
  }
  async head(key) { return this.objects.get(key) || null; }
  async get(key, options) {
    const object = await this.head(key);
    if (!object) return null;
    const range = options?.range;
    const bytes = range ? object.bytes.slice(range.offset, range.offset + range.length) : object.bytes;
    return { ...object, body: new Blob([bytes]).stream() };
  }
  async delete(key) { this.objects.delete(key); }
  async list(options) {
    if (this.fail) throw new Error("Simulated storage failure");
    const all = [...this.objects.values()].filter((object) => object.key.startsWith(options.prefix))
      .sort((left, right) => left.key.localeCompare(right.key));
    const offset = Number(options.cursor || 0);
    const objects = all.slice(offset, offset + options.limit);
    const truncated = offset + objects.length < all.length;
    return { objects, truncated, cursor: String(offset + objects.length) };
  }
}

export function createEnvironment() {
  const instances = new Map();
  const env = {
    AUTH_DEMO_EMAIL: "admin@example.com",
    AUTH_DEMO_PASSWORD: "test-admin-password",
    SESSION_SECRET: "test-session-secret-with-random-material",
    PROJECT_AUDIO: new MemoryBucket(),
    AUTH_SESSION_DO: {
      idFromName: (name) => name,
      get(name) {
        if (!instances.has(name)) {
          const values = new Map();
          instances.set(name, new AuthSessionDO({ storage: {
            get: async (key) => values.get(key),
            put: async (key, value) => values.set(key, value),
            delete: async (key) => values.delete(key),
          } }));
        }
        const instance = instances.get(name);
        return { fetch: (url, options) => instance.fetch(new Request(url, options)) };
      },
    },
  };
  return env;
}

export const fetchWorker = (env, path, options = {}) => worker.fetch(new Request(ORIGIN + path, options), env);

export { ORIGIN, API, MP3 };
