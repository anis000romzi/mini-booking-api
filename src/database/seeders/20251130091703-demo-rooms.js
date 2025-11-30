'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('rooms', [
      {
        id: '4c73f34f-8c65-47b8-9092-09b31572249b',
        room_name: 'Testing Room',
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '93cd82f7-d0b7-4414-9d2e-404914fd3281',
        room_name: 'Experiment Room #876',
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('rooms', null, {});
  },
};
