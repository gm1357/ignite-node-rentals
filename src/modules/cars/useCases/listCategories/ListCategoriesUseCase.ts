import { Category } from "../../models/category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

class ListCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    execute(): Category[] {
        return this.categoryRepository.list();
    }
}

export { ListCategoriesUseCase };
