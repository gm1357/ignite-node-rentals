import { Router } from "express";

import { authenticateRoutes } from "./authenticate.route";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.route";
import { usersRoutes } from "./users.route";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export { router };
