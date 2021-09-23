import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );

        try {
            await createSpecificationUseCase.execute({ name, description });
        } catch (err: any) {
            return res.status(400).send({ error: err.message });
        }

        return res.status(201).send();
    }
}

export { CreateSpecificationController };
