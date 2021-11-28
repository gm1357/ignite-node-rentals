import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `
        INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
            values('${id}', 'admin', 'admin@node-rentals.com.br', '${password}', true, 'now()', 'ABC-1234')
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@node-rentals.com.br",
            password: "admin",
        });

        const { refresh_token } = responseToken.body;

        const respose = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Description supertest",
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(respose.status).toBe(201);
    });

    it("should not be able to create a new category when name already exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@node-rentals.com.br",
            password: "admin",
        });

        const { refresh_token } = responseToken.body;

        const respose = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Description supertest",
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(respose.status).toBe(400);
    });
});
