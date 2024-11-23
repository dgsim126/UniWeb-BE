const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = {}
const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // 포트 설정 추가
    dialect: 'mariadb', // MariaDB 사용
    logging: false, // 쿼리 로깅 비활성화
    //timezone: '+09:00' // 한국 시간대 설정
  }
  );

// db 객체에 각 모델 및 Sequelize 설정 추가
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
