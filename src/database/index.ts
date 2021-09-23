import { createConnection, getConnectionOptions } from "typeorm";

import { User } from "../modules/accounts/entities/user";
import { Category } from "../modules/cars/entities/category";
import { Specification } from "../modules/cars/entities/specification";

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
