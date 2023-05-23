import LandManagementModel from "./model";
import { ICreateLandManagementAllRequest } from "./interface";

async function getAll(where: any) {
  return await LandManagementModel.findAll({
    where: { ...where },
  });
}

async function getOne(where: any) {
  return await LandManagementModel.findOne({
    where,
  });
}

async function create(values: ICreateLandManagementAllRequest) {
  return await LandManagementModel.create({ ...values });
}

async function updateWhere(
  where: any,
  values: ICreateLandManagementAllRequest
) {
  return await LandManagementModel.update({ ...values }, { where });
}

export default { getAll, updateWhere, create, getOne };
