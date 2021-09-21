import { Category } from "../models/category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    list(): Category[];
    findByName(name: string): Category | undefined;
}

export { ICreateCategoryDTO, ICategoryRepository };
