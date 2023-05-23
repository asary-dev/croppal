import { Model, DataTypes } from "sequelize";
import sequelize from "../../common/database";
import Farm from "../farm/model";

class WaterManagement extends Model {
  declare id: number;
  declare land_id: number;
  declare date: string;
  declare picture: string | null;
  declare comment: string;
  declare method: "irrigation" | "drainage";
}

WaterManagement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    land_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    date: {
      type: new DataTypes.DATEONLY(),
      allowNull: false,
    },
    picture: {
      type: new DataTypes.STRING(250),
      allowNull: true,
    },
    comment: {
      type: new DataTypes.STRING(250),
      allowNull: true,
    },
    method: {
      type: new DataTypes.ENUM("irrigation", "drainage"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "water_management",
  }
);

export default WaterManagement;
