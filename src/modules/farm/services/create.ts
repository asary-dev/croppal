import Joi from "joi";

import Err from "../../../common/error";
import FarmRepository from "../repository";
import { ICreateFarmValues, IFarmDetail } from "../interface";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export default async function (
  values: ICreateFarmValues
): Promise<IFarmDetail> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const result = await FarmRepository.create(value);

    return {
      id: result.id,
      name: result.name,
    };
  } catch (error: any) {
    throw new Err.InternalServerError("ASDSD");
  }
}
