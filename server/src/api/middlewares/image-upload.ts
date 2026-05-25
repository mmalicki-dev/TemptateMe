import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Resolves to server/tmp/ regardless of the working directory at launch
export const tmpDir = path.join(__dirname, "../../../../tmp/");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    try {
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    } catch (err) {
      console.error(err);
    }
    cb(null, tmpDir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const fileMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
