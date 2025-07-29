require('dotenv').config();

module.exports = {
  csvPath: process.env.CSV_PATH,
  dbUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
};
