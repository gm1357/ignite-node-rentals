import dayjs from "dayjs";

import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carRepositoryInMemory = new CarRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            brand: "Brand test",
            fine_amount: 50,
            license_plate: "12345",
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id ?? "123",
            expected_return_date: tomorrow,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            brand: "Brand test",
            fine_amount: 50,
            license_plate: "12345",
            category_id: "1234",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id ?? "123",
            expected_return_date: tomorrow,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "BBB",
                expected_return_date: tomorrow,
            })
        ).rejects.toEqual(
            new AppError("There's already a rental in progress for the user!")
        );
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            brand: "Brand test",
            fine_amount: 50,
            license_plate: "12345",
            category_id: "1234",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id ?? "123",
            expected_return_date: tomorrow,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "54321",
                car_id: car.id ?? "123",
                expected_return_date: tomorrow,
            })
        ).rejects.toEqual(new AppError("Car is unavailable!"));
    });

    it("should not be able to create a new rental if return time less than 24h from creation", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "AAA",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(
            new AppError("Invalid return time! minimum rent time is 24 hours!")
        );
    });
});
