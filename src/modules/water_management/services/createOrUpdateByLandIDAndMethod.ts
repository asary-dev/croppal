import Joi from "joi";

import Err from "../../../common/error";
import Create from "./create";
import WaterManagementRepository from "../repository";
import {
  ICreateWaterManagementRequest,
  IWaterManagementBaseResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
  date: Joi.date().required(),
  picture: Joi.string().optional().allow(null, ""),
  comment: Joi.string().required(),
  method: Joi.string().valid("irrigation", "drainage").required(),
});

export default async function (
  values: ICreateWaterManagementRequest
): Promise<IWaterManagementBaseResult> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await WaterManagementRepository.getOne({
      land_id: value.land_id,
      method: value.method,
    });

    if (!findRecord) {
      const resultCreate = Create(value);
      return resultCreate;
    }

    findRecord.date = value.date;
    findRecord.picture = value.picture;
    findRecord.comment = value.comment;

    await findRecord.save();

    return findRecord;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
