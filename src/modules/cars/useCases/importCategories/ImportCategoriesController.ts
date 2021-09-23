import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
    constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;

        if (!file) {
            return res.status(400).send({ error: "Need to send file!" });
        }

        await this.importCategoriesUseCase.execute(file);

        return res.send();
    }
}

export { ImportCategoriesController };
