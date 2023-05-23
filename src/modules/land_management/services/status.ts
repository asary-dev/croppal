import Joi from "joi";

import Err from "../../../common/error";
import LandManagementRepository from "../repository";
import WaterManagementRepository from "../../water_management/repository";
import FarmRepository from "../../farm/repository";
import {
  IGetAllLandManagementRequest,
  ILandPreparationStatus,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
});

export default async function (
  values: IGetAllLandManagementRequest
): Promise<ILandPreparationStatus> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await FarmRepository.getOneByID(value.land_id);
    if (!findRecord) {
      throw new Err.NotFound("Record not found");
    }

    const findLands = await LandManagementRepository.getAll({
      land_id: value.land_id,
    });
    const findWaters = await WaterManagementRepository.getAll({
      land_id: value.land_id,
    });

    return {
      prepped_date:
        findLands.find((item) => item.type === "land_preparation")?.date ||
        null,
      sowing_date:
        findLands.find((item) => item.type === "sowing")?.date || null,
      harvest_date:
        findLands.find((item) => item.type === "harvesting")?.date || null,
      has_irrigation:
        findWaters.find((item) => item.method === "irrigation")?.date || null,
      has_drainage:
        findWaters.find((item) => item.method === "drainage")?.date || null,
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
