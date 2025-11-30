'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        allowNull: false,
      },
      roomId: {
        field: 'room_id',
        type: Sequelize.UUID,
        references: { model: 'rooms', key: 'id' },
        allowNull: false,
      },
      startAt: {
        field: 'start_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      endAt: {
        field: 'end_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bookings');
  },
};
