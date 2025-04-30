import { S3Client } from "bun";
import config from "@shared/config";

export default new S3Client({
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
  bucket: config.BUCKET,
});
