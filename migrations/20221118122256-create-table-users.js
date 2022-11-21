'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      role:{
        type: Sequelize.ENUM,
        values: ['admin', 'user', 'high-level'],
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true
      },
      password:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email'],
      name: 'UNIQUE_USERS_EMAIL'
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
