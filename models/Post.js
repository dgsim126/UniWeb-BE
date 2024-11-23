const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // DB 연결 설정 불러오기

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      post_key: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true // 기본키
      },
      user_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // 외래 키 연결
          key: 'user_key'
        },
        onDelete: 'CASCADE' // 사용자가 삭제되면 관련된 게시글도 삭제됨
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false // 게시글의 제목은 반드시 있어야 함
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true // 게시 날짜는 선택 사항
      }
    }, {
      sequelize,
      timestamps: false, // 생성/수정 시간 자동 기록 X
      modelName: 'Post',
      tableName: 'Post', // 테이블 이름
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  }

  // associate 함수 추가
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_key',
      onDelete: 'CASCADE',
    });
    this.hasMany(models.Problem, {
      as: 'problems',  // ############ 수정 ############ alias를 'problems'로 설정
      foreignKey: 'post_key',
      foreignKey: 'post_key',
      onDelete: 'CASCADE',
    });
  }
}

module.exports = Post;
