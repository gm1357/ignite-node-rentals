import { createConnection, getConnectionOptions } from "typeorm";

import { Category } from "../modules/cars/entities/category";

interface IOptions {
    host: string;
}

getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host = "database_ignite";
    createConnection({
        ...options,
        entities: [Category],
    });
});
