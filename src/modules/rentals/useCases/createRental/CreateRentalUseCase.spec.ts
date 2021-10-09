import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "54321",
            expected_return_date: tomorrow,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "AAA",
                expected_return_date: tomorrow,
            });
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "BBB",
                expected_return_date: tomorrow,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "AAA",
                expected_return_date: tomorrow,
            });
            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "AAA",
                expected_return_date: tomorrow,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if return time less than 24h from creation", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "AAA",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
