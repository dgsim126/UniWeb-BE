require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { sequelize } = require("./config/db");
const cors = require('cors'); // cors 추가


// 모델 초기화 및 관계 설정
const User = require('./models/User');
const Post = require('./models/Post');
const Problem = require('./models/Problem');  
const Answer = require('./models/Answer');    

// 모델 초기화 => 초기 한 번만 진행하면 테이블 갱신됨
User.init(sequelize);
Post.init(sequelize);
Problem.init(sequelize);  
Answer.init(sequelize);  

// 모델 간의 관계 설정
User.associate({ Post });
Post.associate({ User, Problem });  
Problem.associate({ Post, Answer }); 
Answer.associate({ Problem });      

const app = express();

const port = 8080;

app.use(cors({
    // origin: true, // 로컬 테스트용
    origin: 'https://uniwebgame.netlify.app', // 해당 도메인만 허용
    credentials: true // 쿠키를 포함한 요청을 허용
}));

// 데이터베이스 연결
sequelize
.sync({ force: false }) // 현재 모델 상태 반영(배포 시 false로 변환) // true 시 값 날라감
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch(err => {
    console.log(err);
});

// EJS를 뷰 엔진으로 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 미들웨어 설정
//app.use(express.json());
//app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱
app.use(express.json({ limit: '10mb' })); // !!!!!!! 수정 !!!!! 요청 본문 크기 제한 설정 (10MB)
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // !!!!!!! 수정 !!!!! URL-encoded 데이터 크기 제한 설정 (10MB)
app.use(cookieParser()); // 쿠키 파서 미들웨어 추가

// 회원가입, 로그인, 로그아웃, 프로필, 현재 로그인중인 사용자의 이름만 반환
app.use("/api", require("./routers/User/loginRoute"))
app.use("/api/register", require("./routers/User/registerRoute"));
app.use("/api/my", require("./routers/User/profileRoute"));
app.use("/api/post", require("./routers/Post/postRoute"));

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});