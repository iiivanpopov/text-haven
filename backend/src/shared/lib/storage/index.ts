import type { S3Client } from "bun";
import ApiError from "@shared/lib/exceptions/ApiError";
import s3 from "@shared/lib/s3";

export class Storage {
  constructor(private s3: S3Client) {}

  async writeFile(name: string, content: string): Promise<number> {
    if (!name) throw ApiError.BadRequest("File name is required");
    return await this.s3.write(name, content);
  }

  async deleteFile(name: string): Promise<void> {
    if (!name) throw ApiError.BadRequest("File name is required");
    const fileExistence = await this.s3.exists(name);
    if (!fileExistence) {
      throw ApiError.NotFound(`File ${name} does not exist in storage`);
    }
    await this.s3.delete(name);
  }

  async deleteFiles(names: string[]): Promise<void> {
    if (!names || names.length === 0) return;
    const results = await Promise.allSettled(
      names.map((name) => this.deleteFile(name)),
    );

    results.forEach((res, i) => {
      if (res.status === "rejected") {
        console.warn(`Failed to delete ${names[i]}:`, res.reason);
      }
    });
  }

  async getFileContent(name: string): Promise<string> {
    if (!name) throw ApiError.BadRequest("File name is required");
    const fileExistence = await this.s3.exists(name);
    if (!fileExistence) {
      throw ApiError.NotFound(`File ${name} does not exist`);
    }
    return await this.s3.file(name).text();
  }
}

export default new Storage(s3);
