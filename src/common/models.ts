import FarmModel from "../modules/farm/model";
import LandManagementModel from "../modules/land_management/model";
import WaterManagementModel from "../modules/water_management/model";

const isDevelopment = process.env.ENVIRONMENT === "development";

const initializeModels = () =>
  Promise.all([
    FarmModel.sync({ alter: isDevelopment }),
    LandManagementModel.sync({ alter: isDevelopment }),
    WaterManagementModel.sync({ alter: isDevelopment }),
  ]);

FarmModel.hasMany(WaterManagementModel, {
  foreignKey: "land_id",
});
FarmModel.hasMany(WaterManagementModel, {
  foreignKey: "land_id",
});
LandManagementModel.belongsTo(FarmModel, {
  foreignKey: "land_id",
});
WaterManagementModel.belongsTo(FarmModel, {
  foreignKey: "land_id",
});

const models = {
  FarmModel,
  LandManagementModel,
  WaterManagementModel,
};

export { initializeModels, models };
