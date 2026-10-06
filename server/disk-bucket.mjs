import { mkdir, readFile, writeFile, rename, rm, readdir, stat } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const PREFIX = "projects/audio/";
const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.mp3$/;

export class DiskBucket {
  constructor(directory) {
    this.directory = resolve(directory);
    this.files = join(this.directory, "files");
    this.metadata = join(this.directory, "metadata");
  }

  async init() {
    await mkdir(this.files, { recursive: true, mode: 0o750 });
    await mkdir(this.metadata, { recursive: true, mode: 0o750 });
  }

  fileId(key) {
    const id = key.slice(PREFIX.length);
    if (!key.startsWith(PREFIX) || !FILE_ID.test(id)) throw new Error("Invalid audio storage key");
    return id;
  }

  async put(key, file, options) {
    const id = this.fileId(key);
    const temporary = join(this.files, id + ".upload");
    const destination = join(this.files, id);
    const metaTemporary = join(this.metadata, id + ".upload");
    const metaDestination = join(this.metadata, id + ".json");
    const metadata = {
      key, size: file.size, uploaded: new Date().toISOString(),
      httpEtag: '"' + id + '"',
      httpMetadata: options.httpMetadata,
      customMetadata: options.customMetadata,
    };
    try {
      await pipeline(Readable.fromWeb(file.stream()), createWriteStream(temporary, { flags: "wx", mode: 0o640 }));
      await writeFile(metaTemporary, JSON.stringify(metadata), { flag: "wx", mode: 0o640 });
      await rename(temporary, destination);
      await rename(metaTemporary, metaDestination);
    } catch (error) {
      await Promise.all([temporary, metaTemporary, destination].map((path) => rm(path, { force: true }).catch(() => {})));
      throw error;
    }
    return { ...metadata, uploaded: new Date(metadata.uploaded) };
  }

  async head(key) {
    const id = this.fileId(key);
    try {
      const metadata = JSON.parse(await readFile(join(this.metadata, id + ".json"), "utf8"));
      const file = await stat(join(this.files, id));
      return { ...metadata, key, size: file.size, uploaded: new Date(metadata.uploaded) };
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }

  async get(key, options) {
    const metadata = await this.head(key);
    if (!metadata) return null;
    const range = options?.range;
    const file = createReadStream(join(this.files, this.fileId(key)), range ? {
      start: range.offset,
      end: range.offset + range.length - 1,
    } : {});
    return { ...metadata, body: Readable.toWeb(file) };
  }

  async delete(key) {
    const id = this.fileId(key);
    await rm(join(this.metadata, id + ".json"), { force: true });
    await rm(join(this.files, id), { force: true });
  }

  async list(options) {
    const filenames = (await readdir(this.metadata)).filter((name) =>
      name.endsWith(".json") && FILE_ID.test(name.slice(0, -5))).sort();
    const objects = [];
    for (const filename of filenames) {
      const object = await this.head(PREFIX + filename.slice(0, -5));
      if (object && object.key.startsWith(options.prefix)) objects.push(object);
    }
    const offset = /^\d+$/.test(options.cursor || "0") ? Number(options.cursor || 0) : 0;
    const page = objects.slice(offset, offset + options.limit);
    return { objects: page, truncated: offset + page.length < objects.length, cursor: String(offset + page.length) };
  }
}
