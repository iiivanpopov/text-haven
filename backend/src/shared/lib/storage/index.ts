import type { S3Client } from "bun";
import ApiError from "@shared/lib/exceptions/ApiError";
import s3 from "@shared/lib/s3";

export class Storage {
  constructor(private s3: S3Client) {}

  async writeFile(name: string, content: string): Promise<number> {
    return await this.s3.write(name, content);
  }

  async deleteFile(name: string): Promise<void> {
    const fileExistence = await this.s3.exists(name);
    if (!fileExistence) {
      throw ApiError.BadRequest(`File ${name} does not exist`);
    }
    await this.s3.delete(name);
  }

  async deleteFiles(names: string[]): Promise<void> {
    const promises: Promise<void>[] = names.map((name) =>
      this.deleteFile(name),
    );
    await Promise.allSettled(promises);
  }

  async getFileContent(name: string): Promise<string> {
    const fileExistence = await this.s3.exists(name);
    if (!fileExistence) {
      throw ApiError.BadRequest(`File ${name} does not exist`);
    }
    return await this.s3.file(name).text();
  }
}

export default new Storage(s3);
