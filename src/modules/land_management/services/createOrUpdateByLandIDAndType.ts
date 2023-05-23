import Joi from "joi";

import Err from "../../../common/error";
import Create from "./create";
import LandManagementRepository from "../repository";
import {
  ICreateLandManagementAllRequest,
  ILandManagementAllResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
  type: Joi.string()
    .required()
    .valid("sowing", "land_preparation", "harvesting"),
  date: Joi.date().required(),
  picture: Joi.string().optional().allow(null, ""),
  comment: Joi.string().required(),
  method: Joi.alternatives().conditional("type", {
    is: "sowing",
    then: Joi.string().valid("direct_seeding", "transplanting"),
    otherwise: Joi.string().valid("mechanical", "manual"),
  }),
  rice_cultivar: Joi.alternatives().conditional("type", {
    is: "sowing",
    then: Joi.string().valid("small", "medium", "large"),
    otherwise: Joi.optional(),
  }),
});

export default async function (
  values: ICreateLandManagementAllRequest
): Promise<ILandManagementAllResult> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await LandManagementRepository.getOne({
      land_id: value.land_id,
      type: value.type,
    });

    if (!findRecord) {
      const resultCreate = Create(value);
      return resultCreate;
    }

    findRecord.date = value.date;
    findRecord.method = value.method;
    findRecord.picture = value.picture;
    findRecord.comment = value.comment;
    findRecord.rice_cultivar = value.rice_cultivar;

    await findRecord.save();

    return findRecord;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
