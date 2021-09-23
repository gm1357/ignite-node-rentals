import { Category } from "../../entities/category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

class ListCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(): Promise<Category[]> {
        return this.categoryRepository.list();
    }
}

export { ListCategoriesUseCase };
