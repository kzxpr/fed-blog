require('dotenv').config();

module.exports = {
    client: 'mysql',
    connection: process.env.DB_URL,
    migrations: {
        directory: './server/migrations',
    },
    charset: 'utf8mb4'
};