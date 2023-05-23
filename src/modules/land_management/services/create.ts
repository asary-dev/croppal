import Joi from "joi";

import Err from "../../../common/error";
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
  method: Joi.alternatives()
    .conditional("type", {
      is: "sowing",
      then: Joi.string().valid("direct_seeding", "transplanting"),
      otherwise: Joi.string().valid("mechanical", "manual"),
    })
    .required(),
  rice_cultivar: Joi.alternatives().conditional("type", {
    is: "sowing",
    then: Joi.string().valid("small", "medium", "large").required(),
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

    const result = await LandManagementRepository.create(value);

    return result;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
