import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to a non-existent car", async () => {
        const car_id = "1234";
        const specifications_ids = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_ids,
            })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });

    it("should be able to add a new specification to a car", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "A1D23",
            fine_amount: 200,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test desc",
            name: "test name",
        });

        const specifications_ids = [specification.id as string];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id ? car.id : "",
            specifications_ids,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
