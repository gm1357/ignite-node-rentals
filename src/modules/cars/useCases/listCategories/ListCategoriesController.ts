import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const all = await this.listCategoriesUseCase.execute();

        return res.send(all);
    }
}

export { ListCategoriesController };
