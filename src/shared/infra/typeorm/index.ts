import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/user";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

export default async (host = "database_ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host,
            entities: [Category, Specification, User, Car],
        })
    );
};
