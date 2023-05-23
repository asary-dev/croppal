import Joi from "joi";

import Err from "../../../common/error";
import LandManagementRepository from "../repository";
import {
  IGetLandManagementByTypeRequest,
  ILandManagementAllResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
  type: Joi.string()
    .required()
    .valid("sowing", "land_preparation", "harvesting"),
});

export default async function (
  values: IGetLandManagementByTypeRequest
): Promise<ILandManagementAllResult> {
  try {
    const value: IGetLandManagementByTypeRequest = await schema
      .validateAsync(values)
      .catch((reason) => {
        throw new Err.UnprocessableContent(reason.message);
      });

    const findRecord = await LandManagementRepository.getOne({
      land_id: value.land_id,
      type: value.type,
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
