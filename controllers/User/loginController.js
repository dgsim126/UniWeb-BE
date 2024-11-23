const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

/**
 * 로그인
 * POST /api/login
 */
const login = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  try {
    // 사용자가 입력한 이메일로 데이터베이스에서 사용자 찾기
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(401).send('Invalid id or password');
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // JWT 토큰 생성
    const payload = { userID: user.user_key };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

    // JWT 토큰을 쿠키에 설정
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // HTTPS가 아닌 경우 false로 설정 - [로컬 테스트 시 주석처리]
      sameSite: 'None' // 크로스 도메인 쿠키 전송 허용 - [로컬 테스트 시 주석처리]
    });

    const message = user.isAdmin ? 'Login successful as admin' : 'Login successful';

    // 로그인 성공 및 토큰 반환
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * 로그아웃
 * POST /api/logout
 */
const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });
    res.status(200).send("Logout successful");
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = { login, logout };