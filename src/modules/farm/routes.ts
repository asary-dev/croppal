import express from "express";
import * as FarmController from "./controller";

export const routes = express.Router();

routes.get("/", FarmController.getAllFarms);
routes.get("/:id", FarmController.getFarmByID);
routes.post("/", FarmController.createFarm);
routes.put("/:id", FarmController.updateFarmByID);
routes.get("/:id/stage-of-growth", FarmController.getStageOfGrowth);

export default routes;
