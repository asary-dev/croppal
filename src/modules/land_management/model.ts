import { Model, DataTypes } from "sequelize";
import sequelize from "../../common/database";

class LandManagement extends Model {
  declare id: number;
  declare land_id: number;
  declare type: "sowing" | "land_preparation" | "harvesting";
  declare date: string;
  declare picture: string | null;
  declare comment: string;
  declare method:
    | "mechanical"
    | "manual"
    | "direct_seeding"
    | "transplanting"
    | null;
  declare rice_cultivar: "small" | "medium" | "large" | null;
}

LandManagement.init(
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
    type: {
      type: new DataTypes.ENUM("sowing", "land_preparation", "harvesting"),
      allowNull: false,
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
      type: new DataTypes.ENUM(
        "mechanical",
        "manual",
        "direct_seeding",
        "transplanting"
      ),
      allowNull: true,
    },
    rice_cultivar: {
      type: new DataTypes.ENUM("small", "medium", "large"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "land_management",
  }
);

export default LandManagement;
