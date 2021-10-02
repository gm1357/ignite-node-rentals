import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarRepository")
        private carRepository: ICarRepository
    ) {}

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carRepository.findAvailable(
            brand,
            category_id,
            name
        );

        return cars;
    }
}

export { ListAvailableCarsUseCase };
