import Joi from "joi";

import Err from "../../../common/error";
import FarmRepository from "../repository";
import { IFarmDetail, IUpdateFarmValues } from "../interface";

const schema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3).max(30).required(),
});

export default async function (
  values: IUpdateFarmValues
): Promise<IFarmDetail> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await FarmRepository.getOneByID(value.id);
    if (!findRecord) {
      throw new Err.NotFound("Record not found");
    }

    findRecord.name = value.name;

    await findRecord.save();

    return {
      id: findRecord.id,
      name: findRecord.name,
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
