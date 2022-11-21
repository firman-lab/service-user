'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        name: "Yoona",
        role: "admin",
        email: "yoona@gmail.com",
        password: await bcrypt.hash('semriwing123', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: "Aurelie",
      //   role: "",
      //   email: "yoona@gmail.com",
      //   password: await bcrypt.hash('semriwing123', 10),
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
