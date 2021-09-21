import { Router } from "express";

import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createCategoryService = new CreateCategoryService(categoryRepository);

    try {
        createCategoryService.execute({ name, description });
    } catch (err: any) {
        return res.status(400).send({ error: err.message });
    }

    return res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
    const all = categoryRepository.list();

    return res.send(all);
});

export { categoriesRoutes };
