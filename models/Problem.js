const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const Post = require('./Post'); // Post 모델 불러오기

class Problem extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      problem_key: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true // 기본키
      },
      post_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Post', // 외래 키 연결
          key: 'post_key'
        },
        onDelete: 'CASCADE' // 게시글이 삭제되면 관련된 문제도 삭제됨
      },
      problem_text: {
        type: DataTypes.TEXT,
        allowNull: false // 문제 텍스트는 반드시 있어야 함
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Problem',
      tableName: 'Problem',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  // associate 함수 추가
  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: 'post_key',
      as: 'post',  // ############ 수정 ############ alias를 'post'로 설정
      onDelete: 'CASCADE',
    });
    this.hasMany(models.Answer, {
      foreignKey: 'problem_key',
      as: 'answers',  // ############ 수정 ############ alias를 'answers'로 설정
      onDelete: 'CASCADE',
    });
  }
}

module.exports = Problem;
