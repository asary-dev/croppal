import Joi from "joi";
import { Op } from "sequelize";

import Err from "../../../common/error";
import FarmRepository from "../repository";
import LandManagementRepository from "../../land_management/repository";
import { IGetFarmByIDValues, IStageOfGrowth } from "../interface";

const schema = Joi.object({
  id: Joi.number().required(),
});

export default async function (
  values: IGetFarmByIDValues
): Promise<IStageOfGrowth> {
  try {
    const value = await schema.validateAsync(values).catch((reason) => {
      throw new Err.UnprocessableContent(reason.message);
    });

    const findRecord = await FarmRepository.getOneByID(value.id);
    if (!findRecord) {
      throw new Err.NotFound("Record not found");
    }

    const find = await LandManagementRepository.getAll({
      land_id: value.id,
      type: {
        [Op.in]: ["harvesting", "sowing"],
      },
    });

    const harvest = find.find((item) => item.type === "harvesting");
    const sow = find.find((item) => item.type === "sowing");
    let das = 0;

    if (sow) {
      const startDate = new Date(sow.date);
      const curDate = new Date();
      const diff = curDate.getTime() - startDate.getTime();
      das = Math.floor(diff / (1000 * 3600 * 24));
    }

    return {
      is_harvest: Boolean(harvest),
      rice_cultivar: sow?.rice_cultivar || null,
      das,
    };
  } catch (error: any) {
    if (error.status) throw error;
    throw new Err.InternalServerError(error.message);
  }
}
