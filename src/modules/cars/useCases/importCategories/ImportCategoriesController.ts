import { Request, Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
    constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

    handle(req: Request, res: Response): Response {
        const { file } = req;

        if (!file) {
            return res.status(400).send({ error: "Need to send file!" });
        }

        this.importCategoriesUseCase.execute(file);

        return res.send();
    }
}

export { ImportCategoriesController };
