import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import upload from "@config/upload";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";
import "../../container";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).send({ message: err.message });
    }

    return res
        .status(500)
        .send({ message: `Internal server error - ${err.message}` });
});

export { app };
