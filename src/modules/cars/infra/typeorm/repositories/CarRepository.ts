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

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }

        return carsQuery.getMany();
    }

    async findById(id: string): Promise<Car | undefined> {
        return this.repository.findOne(id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { CarRepository };
