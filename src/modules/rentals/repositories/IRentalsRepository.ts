import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";
import { Rental } from "../infra/typeorm/entities/rental";

interface IRentalsRepository {
    findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
    findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
    create(data: ICreateRentalsDTO): Promise<Rental>;
    findById(id: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };
