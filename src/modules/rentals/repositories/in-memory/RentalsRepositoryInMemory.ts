import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && rental.end_date === null
        );
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && rental.end_date === null
        );
    }
}

export { RentalsRepositoryInMemory };
