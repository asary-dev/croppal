import Joi from "joi";
import { Op } from "sequelize";

import Err from "../../../common/error";
import FarmRepository from "../repository";
import { IGetAllFarmValues, IFarmDetail } from "../interface";

const schema = Joi.object({
  search: Joi.string()
    .optional()
    .allow(null, "")
    .empty([null, "", "undefined"])
    .default(""),
});

export default async function (
  values: IGetAllFarmValues
): Promise<IFarmDetail[]> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    let where = {
      name: {
        [Op.iLike]: `%${value?.search || ""}%`,
      },
    };
    console.log(where);
    const findRecord = await FarmRepository.getAll(where);

    return findRecord.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
