"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("land_management", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      land_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: "farm",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: new Sequelize.DataTypes.ENUM(
          "sowing",
          "land_preparation",
          "harvesting"
        ),
        allowNull: false,
      },
      date: {
        type: new Sequelize.DataTypes.DATEONLY(),
        allowNull: false,
      },
      picture: {
        type: new Sequelize.DataTypes.STRING(250),
        allowNull: true,
      },
      comment: {
        type: new Sequelize.DataTypes.STRING(250),
        allowNull: true,
      },
      method: {
        type: new Sequelize.DataTypes.ENUM(
          "mechanical",
          "manual",
          "direct_seeding",
          "transplanting"
        ),
        allowNull: true,
      },
      rice_cultivar: {
        type: new Sequelize.DataTypes.ENUM("small", "medium", "large"),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("land_management");
  },
};
