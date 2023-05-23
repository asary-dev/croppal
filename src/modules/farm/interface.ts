export interface BaseItem {
  id: number;
  name: string;
}

export interface IFarmDetail {
  id: number;
  name: string;
}

export interface IGetAllFarmValues {
  search?: string;
}

export interface ICreateFarmValues {
  name: string;
}

export interface IGetFarmByIDValues {
  id: number;
}

export interface IUpdateFarmValues {
  id: number;
  name: string;
}

export interface ISearchFarm {
  name: any;
}

export interface IStageOfGrowth {
  is_harvest: boolean;
  rice_cultivar: "small" | "medium" | "large" | null;
  das: number;
}
