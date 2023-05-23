import { Request, Response, NextFunction } from "express";
import * as WaterManagementService from "./services";
import * as WaterManagementTransformer from "./transformer";
import { IWaterManagementBaseResult } from "./interface";

async function getAllWaterManagement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await WaterManagementService.GetAllByLandID({
      land_id: parseInt(req.params.land_id),
    });

    return res.status(200).json({
      data: WaterManagementTransformer.listOfWaterManagement(result),
    });
  } catch (error) {
    next(error);
  }
}

async function createOrUpdateWaterManagement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result: IWaterManagementBaseResult =
      await WaterManagementService.CreateOrUpdateByLandIDAndType({
        ...req.body,
        ...req.params,
      });

    return res
      .status(200)
      .json({ data: WaterManagementTransformer.waterManagementDetail(result) });
  } catch (error) {
    next(error);
  }
}

async function getOneWaterManagementByIDAndMethod(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result: IWaterManagementBaseResult =
      await WaterManagementService.GetOneByLandIDAndType({
        ...req.body,
        ...req.params,
      });

    return res
      .status(200)
      .json({ data: WaterManagementTransformer.waterManagementDetail(result) });
  } catch (error) {
    next(error);
  }
}

async function getWaterManagementStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await WaterManagementService.Status({
      ...req.body,
      ...req.params,
    });

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export {
  getAllWaterManagement,
  createOrUpdateWaterManagement,
  getOneWaterManagementByIDAndMethod,
  getWaterManagementStatus,
};
