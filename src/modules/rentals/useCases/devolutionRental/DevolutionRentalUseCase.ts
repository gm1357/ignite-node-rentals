import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarRepository")
        private carRepository: ICarRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental does not exist!");
        }

        const car = await this.carRepository.findById(rental.car_id);

        if (!car || car.id === undefined) {
            throw new AppError("Car does not exist!");
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

        if (daily <= 0) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
