import { Router } from "express";

import { authenticateRoutes } from "./authenticate.route";
import { carsRoutes } from "./cars.route";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.route";
import { specificationsRoutes } from "./specifications.route";
import { usersRoutes } from "./users.route";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);

export { router };
