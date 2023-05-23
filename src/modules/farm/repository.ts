import FarmModel from "./model";
import { IUpdateFarmValues, ICreateFarmValues, ISearchFarm } from "./interface";

async function getAll(where: ISearchFarm) {
  return await FarmModel.findAll({
    where: { ...where },
  });
}

async function getOneByID(id: number) {
  return await FarmModel.findOne({
    where: {
      id: id,
    },
  });
}

async function create(values: ICreateFarmValues) {
  return await FarmModel.create({ ...values });
}

async function update(id: number, values: IUpdateFarmValues) {
  return await FarmModel.update(
    { ...values },
    {
      where: { id: id },
    }
  );
}

export default { getAll, getOneByID, create, update };
