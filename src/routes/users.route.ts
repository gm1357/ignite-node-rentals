import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUsersControllers = new CreateUserController();

usersRoutes.post("/", createUsersControllers.handle);

export { usersRoutes };
