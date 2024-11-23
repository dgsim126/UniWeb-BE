const asyncHandler = require("express-async-handler");
const { sequelize } = require("../../config/db");
const bcrypt = require("bcrypt");
const User = require('../../models/User');
const { Sequelize } = require("sequelize");

/**
 * 내 정보 가져오기(마이페이지)
 * GET /api/my
 */
const getProfile = asyncHandler(async (req, res) => {
    try {
        const id= req.user.userID
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json({ id: user.id, name: user.name, age: user.age });
        } else {
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * 내 개인정보 수정하기
 * PUT /api/my/update
 */
const updateProfile = asyncHandler(async (req, res) => {
    try {
        const id = req.user.userID;  
        const { name, password, age } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (name) user.name = name;
        if (age) user.age = age;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        
        await user.save();
        res.status(200).send('Edit Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = { getProfile, updateProfile };
