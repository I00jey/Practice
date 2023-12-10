const Sequelize = require("sequelize");
const config = require("../config/config.json");

const db = {};

const sequelize = new Sequelize(
    config.username,
    config.database,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
