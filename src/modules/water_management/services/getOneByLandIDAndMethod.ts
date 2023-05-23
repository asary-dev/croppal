import Joi from "joi";

import Err from "../../../common/error";
import LandManagementRepository from "../repository";
import {
  IGetWaterManagementByLandIDAndMethodRequest,
  IWaterManagementBaseResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
  method: Joi.string().valid("irrigation", "drainage").required(),
});

export default async function (
  values: IGetWaterManagementByLandIDAndMethodRequest
): Promise<IWaterManagementBaseResult> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await LandManagementRepository.getOne({
      land_id: value.land_id,
      method: value.method,
    });

    if (!findRecord) {
      throw new Err.NotFound("Record not found");
    }

    return findRecord;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
