export interface ILandManagementBaseResult {
  id: number;
  land_id: number;
  type: "sowing" | "land_preparation" | "harvesting";
  date: string;
  picture: string | null;
  comment: string;
  method: "mechanical" | "manual";
}

export interface ILandManagementSowingResult
  extends Omit<ILandManagementBaseResult, "method"> {
  method: "direct_seeding" | "transplanting" | null;
  rice_cultivar: "small" | "medium" | "large" | null;
}

export interface ICreateLandManagementBaseRequest {
  date: string;
  picture: string | null;
  comment: string;
  method: "mechanical" | "manual";
}

export interface ICreateLandManagementSowingRequest
  extends Omit<ICreateLandManagementBaseRequest, "method"> {
  method: "direct_seeding" | "transplanting";
  rice_cultivar: "small" | "medium" | "large";
}

export interface ICreateLandManagementAllRequest
  extends Omit<ICreateLandManagementBaseRequest, "method"> {
  method: "mechanical" | "manual" | "direct_seeding" | "transplanting" | null;
  rice_cultivar: "small" | "medium" | "large" | null;
}

export interface ILandManagementAllResult
  extends Omit<ILandManagementBaseResult, "method"> {
  method: "mechanical" | "manual" | "direct_seeding" | "transplanting" | null;
  rice_cultivar: "small" | "medium" | "large" | null;
}

export interface IGetAllLandManagementRequest {
  land_id: number;
}

export interface IGetLandManagementByTypeRequest {
  land_id: number;
  type: "sowing" | "land_preparation" | "harvesting";
}

export interface ILandPreparationStatus {
  prepped_date: string | null;
  sowing_date: string | null;
  harvest_date: string | null;
  has_irrigation: string | null;
  has_drainage: string | null;
}
