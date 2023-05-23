import { Request, Response, NextFunction } from "express";
import FarmServices from "./services";

async function getAllFarms(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await FarmServices.GetAllFarm({
      search: `${req.query.search}`,
    });

    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function getFarmByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await FarmServices.GetFarmByID({
      id: parseInt(req.params.id),
    });

    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function createFarm(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await FarmServices.CreateFarm(req.body);
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function updateFarmByID(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await FarmServices.UpdateFarm({
      ...req.body,
      ...req.params,
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function getStageOfGrowth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await FarmServices.StageOfGrowth({
      id: parseInt(req.params.id),
    });

    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export {
  getAllFarms,
  getFarmByID,
  createFarm,
  updateFarmByID,
  getStageOfGrowth,
};
