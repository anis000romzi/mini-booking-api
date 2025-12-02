'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('bookings', 'room_name', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('bookings', 'customer_name', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('bookings', 'room_name'),
      queryInterface.removeColumn('bookings', 'customer_name'),
    ]);
  },
};
