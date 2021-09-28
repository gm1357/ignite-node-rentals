import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/category";
import { CategoryRepository } from "@modules/cars/repositories/implementations/CategoryRepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: CategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoryRepository.list();
    }
}

export { ListCategoriesUseCase };
