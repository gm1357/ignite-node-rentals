import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IImportCategories {
    name: string;

    description: string;
}

@injectable()
class ImportCategoriesUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const importedCategories: IImportCategories[] = [];

            const parse = csvParse();

            stream.pipe(parse);

            parse.on("data", (line) => {
                const [name, description] = line;

                importedCategories.push({
                    name,
                    description,
                });
            });

            parse.on("end", () => {
                fs.promises.unlink(file.path);

                resolve(importedCategories);
            });

            parse.on("error", (err) => reject(err));
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const categoryAlreadyExists =
                await this.categoryRepository.findByName(name);

            if (!categoryAlreadyExists) {
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoriesUseCase };
