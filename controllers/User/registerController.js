const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// POST /api/register
const register = asyncHandler(async (req, res) => {
  const { id, password, name, age } = req.body;
  console.log("프론트로부터 값을 받음");

  try {
    // 이미 존재하는 이메일인지 확인
    const existingUser = await User.findOne({ where: { id } });
    if (existingUser) {
      console.log("이미존재");
      return res.status(400).send('Email already in use');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User 테이블에 데이터 저장
    const newUser = await User.create({
      id,
      password: hashedPassword,
      name,
      age
    });

    console.log("데이터베이스에 값 넣음");

    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = { register };