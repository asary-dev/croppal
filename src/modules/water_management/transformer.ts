import { IWaterManagementBaseResult } from "./interface";

function waterManagementDetail(item: any): IWaterManagementBaseResult {
  return {
    id: item.id,
    land_id: item.land_id,
    date: item.date,
    picture: item.picture,
    comment: item.comment,
    method: item.method,
  };
}

function listOfWaterManagement(
  items: Array<any>
): Array<IWaterManagementBaseResult> {
  return items.map((item) => {
    return waterManagementDetail(item);
  });
}

export { waterManagementDetail, listOfWaterManagement };
