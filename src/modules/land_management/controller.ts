import { Request, Response, NextFunction } from "express";
import * as LandManagementService from "./services";
import * as LandManagementTransformer from "./transformer";
import {
  ILandManagementAllResult,
  ILandManagementBaseResult,
  ILandManagementSowingResult,
} from "./interface";

async function getAllLandManagement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.params);
    const result = await LandManagementService.GetAllByLandID({
      land_id: parseInt(req.params.land_id),
    });

    return res.status(200).json({
      data: LandManagementTransformer.listOfLandManagement(result),
    });
  } catch (error) {
    next(error);
  }
}

async function createLandManagement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result: ILandManagementBaseResult | ILandManagementSowingResult =
      await LandManagementService.CreateOrUpdateByLandIDAndType({
        ...req.body,
        ...req.params,
      });
    switch (result.type) {
      case "sowing":
        result = LandManagementTransformer.landManagementSowingDetail(result);
        break;
      default:
        result = LandManagementTransformer.landManagementBaseDetail(result);
        break;
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function getLandManagementByLandIDAndType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await LandManagementService.GetOneByLandIDAndType({
      ...req.body,
      ...req.params,
    });

    return res
      .status(200)
      .json({ data: LandManagementTransformer.landManagementDetail(result) });
  } catch (error) {
    next(error);
  }
}

async function getLandManagementStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await LandManagementService.Status({
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
  getAllLandManagement,
  createLandManagement,
  getLandManagementByLandIDAndType,
  getLandManagementStatus,
};
