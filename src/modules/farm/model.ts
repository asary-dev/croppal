import Sequelize from "sequelize";
import sequelize from "../../common/database";

import LandManagement from "../land_management/model";
import WaterManagement from "../water_management/model";

class Farm extends Sequelize.Model {
  declare id: number;
  declare name: string;
}

Farm.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new Sequelize.DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "farm",
  }
);

export default Farm;
