"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    const users_data = require("../data_adspower/user_adspower.json");

    users_data.forEach((el) => {
      el.user_id = el.UserId;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.running = true;

      delete el.UserId
    });

    return queryInterface.bulkInsert("users", users_data, {});
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const users_data = require("../data_adspower/user_adspower.json");
    return queryInterface.bulkDelete("users", users_data, {});
  },
};
