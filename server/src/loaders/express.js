import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import { prefix, jwtSecretKey, clientUrl } from "./../config/index.js";
import routes from "./../api/routes/index.js";
import { logger } from "../utils/index.js";
import { rateLimiter } from "../api/middlewares/index.js";
import bodyParser from "body-parser";
import path from "node:path";

const server = (app) => {
  process.on("uncaughtException", async (error) => {
    logger("00001", "", error.message, "Uncaught Exception", "");
  });

  process.on("unhandledRejection", async (ex) => {
    logger("00002", "", ex.message, "Unhandled Rejection", "");
  });

  if (!jwtSecretKey) {
    logger("00003", "", "Jwtprivatekey is not defined", "Process-Env", "");
    process.exit(1);
  }

  app.set("views", path.join(process.cwd(), "src/views/"));
  app.set("view engine", "ejs");

  app.enable("trust proxy");
  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.static("public"));
  app.disable("x-powered-by");
  app.disable("etag");

  app.use(rateLimiter);
  app.use(prefix, routes);

  app.get("/", (_req, res) => {
    return res
      .status(200)
      .json({
        resultMessage: {
          en: "Project is successfully working...",
          tr: "Proje başarılı bir şekilde çalışıyor...",
        },
        resultCode: "00004",
      })
      .end();
  });

  app.use((_req, _res, next) => {
    const error = new Error("Endpoint could not find!");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, _next) => {
    res.status(error.status || 500);
    let resultCode = "00015";
    let level = "External Error";
    if (error.status === 500) {
      resultCode = "00013";
      level = "Server Error";
    } else if (error.status === 404) {
      resultCode = "00014";
      level = "Client Error";
    }
    logger(resultCode, req?.user?._id ?? "", error.message, level, req);
    return res.json({
      resultMessage: {
        en: error.message,
        tr: error.message,
      },
      resultCode: resultCode,
    });
  });
};

export default server;
