import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ImportCategoriesController } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export default (): ImportCategoriesController => {
    const categoryRepository = new CategoryRepository();
    const importCategoriesUseCase = new ImportCategoriesUseCase(
        categoryRepository
    );
    const importCategoriesController = new ImportCategoriesController(
        importCategoriesUseCase
    );

    return importCategoriesController;
};
