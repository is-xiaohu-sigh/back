// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入expressJoi 
const expressJoi = require('@escook/express-joi')

// 导入login的路由处理模块
const userinfoHandler = require('../router_handle/userinfo.js')
const{name_limit,email_limit, password_limit}=require('../limit/users.js')

//上传头像
router.post('/uploadAvatar',userinfoHandler.uploadAvatar)
//绑定账号
router.post('/bindAccount',userinfoHandler.bindAccount)
//获取用户信息
router.post('/getUserInfo',userinfoHandler.getUserInfo)
//修改姓名
router.post('/changeName',expressJoi(name_limit),userinfoHandler.changeName)
//修改性别
router.post('/changeSex',userinfoHandler.changeSex)
//修改邮箱
router.post('/changeEmail',expressJoi(email_limit),userinfoHandler.changeEmail)
//修改密码
router.post('/changePassword',expressJoi(password_limit),userinfoHandler.changePassword)
//向外暴露路由
module.exports =router