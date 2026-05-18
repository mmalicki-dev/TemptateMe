import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import { prefix, clientUrl } from "./../config/index.js";
import routes from "./../api/routes/index.js";
import { logger } from "../utils/index.js";
import { rateLimiter } from "../api/middlewares/index.js";

interface HttpError extends Error {
  status?: number;
}

export default function expressLoader(app: Express): void {
  process.on("uncaughtException", (error: Error) => {
    logger("00001", "", error.message, "Uncaught Exception", "");
  });

  process.on("unhandledRejection", (ex: unknown) => {
    const message = ex instanceof Error ? ex.message : String(ex);
    logger("00002", "", message, "Unhandled Rejection", "");
  });

  app.enable("trust proxy");
  app.use(cors({ origin: clientUrl, credentials: true }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.static("public"));
  app.disable("x-powered-by");
  app.disable("etag");

  app.use(rateLimiter);
  app.use(prefix, routes);

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      resultMessage: { en: "Project is successfully working..." },
      resultCode: "00004",
    });
  });

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = new Error("Endpoint could not find!") as HttpError;
    error.status = 404;
    next(error);
  });

  app.use((error: HttpError, req: Request, res: Response, _next: NextFunction) => {
    const status = error.status ?? 500;
    let resultCode = "00015";
    let level = "External Error";
    if (status === 500) {
      resultCode = "00013";
      level = "Server Error";
    } else if (status === 404) {
      resultCode = "00014";
      level = "Client Error";
    }
    logger(resultCode, req?.user?._id ?? "", error.message, level, req);
    res.status(status).json({
      resultMessage: { en: error.message },
      resultCode,
    });
  });
}
