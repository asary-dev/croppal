import WaterManagementModel from "./model";
import { ICreateWaterManagementRequest } from "./interface";

async function getAll(where: any) {
  return await WaterManagementModel.findAll({
    where: { ...where },
  });
}

async function getOne(where: any) {
  return await WaterManagementModel.findOne({
    where,
  });
}

async function create(values: ICreateWaterManagementRequest) {
  return await WaterManagementModel.create({ ...values });
}

async function updateWhere(where: any, values: ICreateWaterManagementRequest) {
  return await WaterManagementModel.update({ ...values }, { where });
}

export default { getAll, updateWhere, create, getOne };
