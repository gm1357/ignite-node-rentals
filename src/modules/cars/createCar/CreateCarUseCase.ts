import { AppError } from "@shared/errors/AppError";

import { Car } from "../infra/typeorm/entities/car";
import { ICarRepository } from "../repositories/ICarRepository";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

// @injectable()
class CreateCarUseCase {
    constructor(
        // @inject("CarRepository")
        private carRepository: ICarRepository
    ) {}

    async execute(req: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carRepository.findByLicensePlate(
            req.license_plate
        );

        if (carAlreadyExists) {
            throw new AppError("Car already exists!");
        }

        const car = await this.carRepository.create(req);

        return car;
    }
}

export { CreateCarUseCase };
