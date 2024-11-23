const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');
const Problem = require('./Problem'); // Problem 모델 불러오기

class Answer extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      answer_key: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true // 기본키
      },
      problem_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Problem', // 외래 키 연결
          key: 'problem_key'
        },
        onDelete: 'CASCADE' // 문제가 삭제되면 관련된 정답도 삭제됨
      },
      answer_text: {
        type: DataTypes.STRING,
        allowNull: false // 정답 텍스트는 반드시 있어야 함
      },
      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false // 정답 여부를 표시하는 필드는 필수
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Answer',
      tableName: 'Answer',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  // associate 함수 추가
  static associate(models) {
    this.belongsTo(models.Problem, {
      foreignKey: 'problem_key',
      as: 'problem',  // ############ 수정 ############ alias를 'problem'으로 설정
      onDelete: 'CASCADE',
    });
  }
}

module.exports = Answer;
