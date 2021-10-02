import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List available cars", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const registerdCars = [];
        registerdCars.push(
            await carRepositoryInMemory.create({
                name: "Test car 1",
                description: "Long description",
                daily_rate: 300.5,
                license_plate: "CQO-1234",
                fine_amount: 200,
                brand: "Test",
                category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
            })
        );
        registerdCars.push(
            await carRepositoryInMemory.create({
                name: "Test car 2",
                description: "Long description 222",
                daily_rate: 500.5,
                license_plate: "CQO-4444",
                fine_amount: 200,
                brand: "Test",
                category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
            })
        );

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual(registerdCars);
    });

    it("should be able to list all available cars by brand", async () => {
        const registerdCars = [];
        registerdCars.push(
            await carRepositoryInMemory.create({
                name: "Test car 1",
                description: "Long description",
                daily_rate: 300.5,
                license_plate: "CQO-1234",
                fine_amount: 200,
                brand: "Show",
                category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
            })
        );
        await carRepositoryInMemory.create({
            name: "Test car 2",
            description: "Long description 222",
            daily_rate: 500.5,
            license_plate: "CQO-4444",
            fine_amount: 200,
            brand: "Don't show",
            category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "Show" });

        expect(cars).toEqual(registerdCars);
    });

    it("should be able to list all available cars by name", async () => {
        const registerdCars = [];
        registerdCars.push(
            await carRepositoryInMemory.create({
                name: "Test car 1",
                description: "Long description",
                daily_rate: 300.5,
                license_plate: "CQO-1234",
                fine_amount: 200,
                brand: "Show",
                category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
            })
        );
        await carRepositoryInMemory.create({
            name: "Test car 2",
            description: "Long description 222",
            daily_rate: 500.5,
            license_plate: "CQO-4444",
            fine_amount: 200,
            brand: "Don't show",
            category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Test car 1",
        });

        expect(cars).toEqual(registerdCars);
    });

    it("should be able to list all available cars by category", async () => {
        const registerdCars = [];
        registerdCars.push(
            await carRepositoryInMemory.create({
                name: "Test car 1",
                description: "Long description",
                daily_rate: 300.5,
                license_plate: "CQO-1234",
                fine_amount: 200,
                brand: "Show",
                category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
            })
        );
        await carRepositoryInMemory.create({
            name: "Test car 2",
            description: "Long description 222",
            daily_rate: 500.5,
            license_plate: "CQO-4444",
            fine_amount: 200,
            brand: "Don't show",
            category_id: "a0e68b0a-652e-4c4e-a228-3374c3386995",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "a0e68b0a-652e-4c4e-a228-3374c3386993",
        });

        expect(cars).toEqual(registerdCars);
    });
});
