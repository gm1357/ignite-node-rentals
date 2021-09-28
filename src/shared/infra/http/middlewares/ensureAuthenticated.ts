import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
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
        const { sub: userId } = verify(
            token,
            "f6a4a847d9bd772fbd7f2f02a769439c"
        ) as IPayload;

        const userRepository = new UserRepository();

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError("User doesn't exist", 401);
        }

        req.user = {
            id: userId,
        };

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
