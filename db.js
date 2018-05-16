let Sequelize = require('sequelize');

const dbConfig = {
  DB_NAME: null,
  DB_USER: null,
  DB_PASSWORD: null,
  DB_OPTIONS: {
    dialect: 'sqlite',
    storage: 'msgdb.sqlite3'
  }
};

let db = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  dbConfig.DB_OPTIONS
);

const messageFields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.TEXT
  }
};

const messageOptions = {
  timestamps: false
};

let message = db.define('message', messageFields, messageOptions);

const ogFields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title : { type: Sequelize.STRING },
  description : { type: Sequelize.STRING },
  image : { type: Sequelize.STRING },
};

const ogOptions = {
  timestamps: false
};

let og = db.define('og', ogFields, ogOptions);

message.hasMany(og);
og.belongsTo(message);

message.sync();
og.sync();

module.exports = { message, og };
