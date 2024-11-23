const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {verifyToken} = require('../../middleware/token');
const { 
    showAll, 
    showDetail, 
    showGameDetail,
    createPost,  
    deletePost
} = require('../../controllers/Post/postController');

// 모든 게시글 가져오기
router.get('/', asyncHandler(showAll));

// 게시글 상세 조회
router.get('/:post_key', asyncHandler(showDetail));

// 게시글 내 게임시작
router.get('/:post_key/game', asyncHandler(showGameDetail));

// 게시글 작성
router.post('/create', verifyToken, asyncHandler(createPost));

// 게시글 삭제
router.delete('/delete/:post_key', verifyToken, asyncHandler(deletePost));

module.exports = router;
