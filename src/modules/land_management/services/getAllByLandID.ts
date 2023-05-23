import Joi from "joi";

import Err from "../../../common/error";
import LandManagementRepository from "../repository";
import {
  IGetAllLandManagementRequest,
  ILandManagementAllResult,
} from "../interface";

const schema = Joi.object({
  land_id: Joi.number().required(),
});

export default async function (
  values: IGetAllLandManagementRequest
): Promise<Array<ILandManagementAllResult>> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await LandManagementRepository.getAll({
      land_id: value.land_id,
    });

    return findRecord;
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
