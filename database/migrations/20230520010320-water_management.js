"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("water_management", {
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
        type: new Sequelize.DataTypes.ENUM("irrigation", "drainage"),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("water_management");
  },
};
