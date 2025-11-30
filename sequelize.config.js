require('dotenv').config();
const path = require("path");

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    migrationStorageTableName: 'SequelizeMeta',
    migrations: {
      path: path.resolve(__dirname, './src/database/migrations'),
      pattern: /\.js$/,
    },
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    migrationStorageTableName: 'SequelizeMeta',
    migrations: {
      path: path.resolve(__dirname, './src/database/migrations'),
      pattern: /\.js$/,
    },
  },
};
