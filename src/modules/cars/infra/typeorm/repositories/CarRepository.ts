import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

import { Car } from "../entities/car";

class CarRepository implements ICarRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            ...data,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }
}

export { CarRepository };
