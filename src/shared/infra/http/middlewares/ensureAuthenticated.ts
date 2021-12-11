import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: userId } = verify(token, auth.secret_token) as IPayload;

        req.user = {
            id: userId,
        };

        return next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
