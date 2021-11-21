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
    const usersTokensRepository = new UsersTokensRepository();

    if (!authorization) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: userId } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            userId,
            token
        );

        if (!user) {
            throw new AppError("User doesn't exist", 401);
        }

        req.user = {
            id: userId,
        };

        return next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
