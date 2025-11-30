'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: 'c38c7cc7-686f-46d1-ab87-5c61b8afdc3d',
        first_name: 'Booking',
        last_name: 'Admin',
        user_name: 'booking_admin',
        email: 'admin@mail.com',
        password: await bcrypt.hash('123456', 10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'c015a294-04d4-4557-b3fd-af5ecb9b24ae',
        first_name: 'John',
        last_name: 'Doe',
        user_name: 'john_doe',
        email: 'jonhdoe@mail.com',
        password: await bcrypt.hash('123456', 10),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
