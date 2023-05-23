import Joi from "joi";

import Err from "../../../common/error";
import WaterManagementRepository from "../repository";
import {
  IGetWaterManagementByLandIDRequest,
  IWaterManagementBaseResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
});

export default async function (
  values: IGetWaterManagementByLandIDRequest
): Promise<Array<IWaterManagementBaseResult>> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await WaterManagementRepository.getAll({
      land_id: value.land_id,
    });

    return findRecord;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
