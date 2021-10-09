import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);
