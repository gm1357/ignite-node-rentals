import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        try {
            const response = await authenticateUserUseCase.execute({
                email,
                password,
            });

            return res.send(response);
        } catch (err: any) {
            return res.status(400).send({ error: err.message });
        }
    }
}

export { AuthenticateUserController };
