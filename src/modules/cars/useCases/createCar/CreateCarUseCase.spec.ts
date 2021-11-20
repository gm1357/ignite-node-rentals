import { AppError } from "@shared/errors/AppError";

import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: CarRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carRepository = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "A1D23",
            fine_amount: 200,
            brand: "Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an already registered license plate", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "A1D23",
            fine_amount: 200,
            brand: "Brand",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "Name Car 2",
                description: "Description 2",
                daily_rate: 100,
                license_plate: "A1D23",
                fine_amount: 200,
                brand: "Brand",
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description",
            daily_rate: 100,
            license_plate: "A1D23",
            fine_amount: 200,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
