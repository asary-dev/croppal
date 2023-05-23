import Joi from "joi";

import Err from "../../../common/error";
import FarmRepository from "../repository";
import { IGetFarmByIDValues, IFarmDetail } from "../interface";

const schema = Joi.object({
  id: Joi.number().required(),
});

export default async function (
  values: IGetFarmByIDValues
): Promise<IFarmDetail> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await FarmRepository.getOneByID(value.id);
    if (!findRecord) {
      throw new Err.NotFound("Record not found");
    }

    return {
      id: findRecord.id,
      name: findRecord.name,
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
