import Joi from "joi";

import Err from "../../../common/error";
import WaterManagementRepository from "../repository";
import LandManagementRepository from "../../land_management/repository";
import FarmRepository from "../../farm/repository";
import {
  IGetWaterManagementByLandIDRequest,
  IWaterManagementStatus,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
});

export default async function (
  values: IGetWaterManagementByLandIDRequest
): Promise<IWaterManagementStatus> {
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
      is_prepped: Boolean(
        findLands.find((item) => item.type === "land_preparation")
      ),
      is_sowing: Boolean(findLands.find((item) => item.type === "sowing")),
      is_harvest: Boolean(findLands.find((item) => item.type === "harvesting")),
      has_irrigation: Boolean(
        findWaters.find((item) => item.method === "irrigation")
      ),
      has_drainage: Boolean(
        findWaters.find((item) => item.method === "drainage")
      ),
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
