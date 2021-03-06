"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        defaultValue: "",
      },
      stateProvince: {
        type: Sequelize.STRING(50),
        defaultValue: "",
      },
      country: {
        type: Sequelize.STRING(50),
        defaultValue: "",
      },
      shortDescription: {
        type: Sequelize.STRING(255),
        defaultValue: "",
      },
      aboutMe: {
        type: Sequelize.TEXT,
        defaultValue: "",
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 50000,
      },
      profilePic: {
        type: Sequelize.STRING,
        defaultValue: "default-profile-pic.png",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
