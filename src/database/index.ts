import { createConnection, getConnectionOptions } from "typeorm";

import { User } from "../modules/accounts/infra/typeorm/entities/user";
import { Category } from "../modules/cars/infra/typeorm/entities/category";
import { Specification } from "../modules/cars/infra/typeorm/entities/specification";

interface IOptions {
    host: string;
}

getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "database_ignite";
    createConnection({
        ...options,
        entities: [Category, Specification, User],
    });
});
