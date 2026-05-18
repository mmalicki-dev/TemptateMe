import path from "path";
import multer from "multer";
import fs from "fs";

export const tmpDir = path.join(process.cwd(), "src/tmp/");

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

export const fileMiddleware = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
