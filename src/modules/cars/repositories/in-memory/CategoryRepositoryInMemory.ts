import { Category } from "@modules/cars/infra/typeorm/entities/category";

import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
    private categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category | undefined> {
        return this.categories.find((category) => category.name === name);
    }
}

export { CategoryRepositoryInMemory };
