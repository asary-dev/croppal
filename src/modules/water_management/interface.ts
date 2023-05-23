export interface IWaterManagementBaseResult {
  id: number;
  land_id: number;
  date: string;
  picture: string | null;
  comment: string;
  method: "irrigation" | "drainage";
}

export interface ICreateWaterManagementRequest
  extends Omit<IWaterManagementBaseResult, "id"> {}

export interface IGetWaterManagementByLandIDRequest {
  land_id: number;
}

export interface IGetWaterManagementByLandIDAndMethodRequest
  extends IGetWaterManagementByLandIDRequest {
  method: "irrigation" | "drainage";
}

export interface IWaterManagementStatus {
  is_prepped: Boolean;
  is_sowing: Boolean;
  is_harvest: Boolean;
  has_irrigation: Boolean;
  has_drainage: Boolean;
}
