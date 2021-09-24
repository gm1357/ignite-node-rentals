import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const avatar_file = req.file?.filename;

        if (!avatar_file) {
            return res.status(400).send({ error: "Need to send avatar file!" });
        }

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController };
