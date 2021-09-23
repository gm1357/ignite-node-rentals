import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

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
