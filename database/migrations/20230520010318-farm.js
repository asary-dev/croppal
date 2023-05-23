"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("farm", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.DataTypes.STRING(250),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("farm");
  },
};
