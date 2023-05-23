import express from "express";
import * as LandManagementController from "./controller";

export const routes = express.Router({ mergeParams: true });

routes.get("/", LandManagementController.getAllLandManagement);
routes.put("/:type", LandManagementController.createLandManagement);
routes.get("/status", LandManagementController.getLandManagementStatus);
routes.get("/:type", LandManagementController.getLandManagementByLandIDAndType);

export default routes;
