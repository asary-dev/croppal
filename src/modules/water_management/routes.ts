import express from "express";
import * as LandManagementController from "./controller";

export const routes = express.Router({ mergeParams: true });

routes.get("/", LandManagementController.getAllWaterManagement);
routes.put("/:method", LandManagementController.createOrUpdateWaterManagement);
routes.get("/status", LandManagementController.getWaterManagementStatus);
routes.get(
  "/:method",
  LandManagementController.getOneWaterManagementByIDAndMethod
);

export default routes;
