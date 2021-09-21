import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(req: Request, res: Response): Response {
        const { name, description } = req.body;

        try {
            this.createCategoryUseCase.execute({ name, description });
        } catch (err: any) {
            return res.status(400).send({ error: err.message });
        }

        return res.status(201).send();
    }
}

export { CreateCategoryController };
