import {
  ILandManagementAllResult,
  ILandManagementBaseResult,
  ILandManagementSowingResult,
} from "./interface";

function landManagementAllDetail(item: any): ILandManagementAllResult {
  return {
    id: item.id,
    land_id: item.land_id,
    type: item.type,
    date: item.date,
    picture: item.picture,
    comment: item.comment,
    method: item.method,
    rice_cultivar: item.rice_cultivar,
  };
}

function landManagementBaseDetail(item: any): ILandManagementBaseResult {
  return {
    id: item.id,
    land_id: item.land_id,
    type: item.type,
    date: item.date,
    picture: item.picture,
    comment: item.comment,
    method: item.method,
  };
}

function landManagementSowingDetail(item: any): ILandManagementSowingResult {
  return {
    id: item.id,
    land_id: item.land_id,
    type: item.type,
    date: item.date,
    picture: item.picture,
    comment: item.comment,
    method: item.method,
    rice_cultivar: item.rice_cultivar,
  };
}

function landManagementDetail(
  item: any
): ILandManagementSowingResult | ILandManagementBaseResult {
  if (item.type === "sowing") return landManagementSowingDetail(item);
  return landManagementBaseDetail(item);
}

function listOfLandManagement(
  items: Array<any>
): Array<ILandManagementBaseResult | ILandManagementSowingResult> {
  return items.map((item) => {
    if (item.type === "sowing") return landManagementSowingDetail(item);
    return landManagementBaseDetail(item);
  });
}

export {
  landManagementAllDetail,
  landManagementBaseDetail,
  landManagementSowingDetail,
  listOfLandManagement,
  landManagementDetail,
};
