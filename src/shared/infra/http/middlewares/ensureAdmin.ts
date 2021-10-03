import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.user;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user?.admin) {
        throw new AppError("User isn't admin!");
    }

    return next();
}