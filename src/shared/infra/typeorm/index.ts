import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/user";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/userTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/carImage";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/rental";

export default async (host = "database_ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === "test" ? "localhost" : host,
            entities: [
                Category,
                Specification,
                User,
                Car,
                CarImage,
                Rental,
                UserTokens,
            ],
            database:
                process.env.NODE_ENV === "test"
                    ? "noderentals_test"
                    : defaultOptions.database,
        })
    );
};
