import path from "path";
import multer from "multer";
import fs from "fs";

const tmpDir = path.join(process.cwd(), "src/tmp/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }
    } catch (err) {
      console.error(err);
    }
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileMiddleware = multer({ storage });

export { tmpDir, fileMiddleware };
