import express from "express";
import { Request, Response, NextFunction } from "express";

import FarmRoute from "../modules/farm/routes";
import LandManagementRoute from "../modules/land_management/routes";
import WaterManagementRoute from "../modules/water_management/routes";
export const routes = express.Router({ mergeParams: true });

routes.use("/farm", FarmRoute);
routes.use("/farm/:land_id/land-management", LandManagementRoute);
routes.use("/farm/:land_id/water-management", WaterManagementRoute);

routes.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status).json({ message: err.message });
});
export default routes;
