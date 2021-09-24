import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "express-async-errors";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

app.listen(3333);
