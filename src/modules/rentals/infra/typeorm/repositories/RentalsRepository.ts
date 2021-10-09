import { getRepository, Repository } from "typeorm";

import { ICreateRentalsDTO } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return this.repository.findOne({ user_id });
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return this.repository.findOne({ car_id });
    }

    async create(data: ICreateRentalsDTO): Promise<Rental> {
        const rental = await this.repository.create({
            ...data,
        });

        await this.repository.save(rental);

        return rental;
    }
}

export { RentalsRepository };
