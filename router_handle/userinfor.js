const db = require('../db/index.js')
// 导入bcript加密中间件
const bcrypt = require('bcryptjs')
// 导入crypto 库生成uuid
const crypto = require('crypto')
//处理文件路径
fs = require('fs')

exports.uploadAvatar = (req, res) => {
	//生成唯一标识
	const onlyId = crypto.randomUUID()
	let oldName = req.files[0].filename;
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	const sql = 'insert into image set ?'
	db.query(sql, {
		Image_url: `http://127.0.0.1:3007/upload/${newName}`,
		onlyId
	}, (err, result) => {
		if (err) return res.cc(err)
		res.send({
			onlyId,
			status: 0,
			url: 'http://127.0.0.1:3007/upload/' + newName
		})
	})
}
//绑定账号 onlyid account url
exports.bindAccount = (req, res) => {
	const {
		account,
		// 這個大小寫打錯了
		onlyid,
		url
	} = req.body
	console.log(account, onlyid, url)
	const sql = 'update image set account =? where onlyId = ?'
	db.query(sql, [account, onlyid], (err, result) => {
		if (err) return res.cc(err)
		if (result.affectedRows == 1) {
			const sql1 = 'update users set image_url =? where account =?'
			db.query(sql1, [url, account], (err, result) => {
				if (err) return res.cc(err)
				res.send({
					status: 0,
					message: "修改成功"
				})
			})
		}
	})
}
//修改用户密码 先输入旧䊳 oldPassword 新密码 newPassword id
exports.changePassword = (req,res)=>{
	const sql = 'select password from users where id =?'
	db.query(sql,req.body.id,(err,result)=>{
		if(err) return res.cc(err)
		//bcrypt
		const compareResult =bcrypt.compareSync(req.body.oldPassword,result[0].password)
		if(!compareResult){
			return res.send({
				status:1,
				message:'原密码错误'
			})
		}
		req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
		const sql1='update users set password =? where id =?'
		db.query(sql1,[req.body.newPassword,req.body.id],(err,result)=>{
			if(err) return res.cc(err)
			return res.send({
				status:0,
				message:'修改成功'
			})
		})
	})
}

//获取用户信息,接收参数id
exports.getUserInfor = (req, res) => {
	const sql = 'select * from users where id =?'
	db.query(sql, req.body.id, (err, result) => {
			if(err) return res.cc(err)
			result[0].password=''
			res.send(result[0])
	})
}
//修改名称 接收参数 id name
exports.changeName = (req, res) => {
	const {id,name}=req.body
	const sql = 'update users set name =? where id = ?'
	db.query(sql, [name,id], (err, result) => {
			if(err) return res.cc(err)
			res.send({
				status:0,
				message:'修改成功'
			})
	})
}
//修改性别 接收参数 id sex
exports.changeSex = (req, res) => {
	const {id,sex}=req.body
	const sql = 'update users set sex =? where id = ?'
	db.query(sql, [sex,id], (err, result) => {
			if(err) return res.cc(err)
			res.send({
				status:0,
				message:'修改成功'
			})
	})
}
//修改性别 接收参数 id email
exports.changeEmail = (req, res) => {
	const {id,email}=req.body
	const sql = 'update users set email =? where id = ?'
	db.query(sql, [email,id], (err, result) => {
			if(err) return res.cc(err)
			res.send({
				status:0,
				message:'修改成功'
			})
	})
}
//忘记密码 验证账户和邮箱是否一致 email account
exports.verifyAccountAndEmail =(req,res)=>{
	const {account,email} = req.body
	const sql = 'select * from users where account = ?'
	db.query(sql,account,(err,result)=>{
		if(err) return res.cc(err)
		// res.send(result[0])
		if(email ==result[0].email){
			res.send({
				status:0,
				message:'查询成功',
				id:result[0].id
			})
		}else{
			res.send({
				status:1,
				message:'查询失败'
			})
		}
	})
}
//忘记密码 修改密码 参数 newPassword id
exports.changePasswordInLogin =(req,res)=>{
	const user = req.body
	user.newPassword = bcrypt.hashSync(user.newPassword, 10)
	const sql='update users set password =? where id =?'
	db.query(sql,[user.newPassword,user.id],(err,result)=>{
		if(err) return res.cc(err)
		res.send({
			status:0,
			message:'更新成功'
		})
	})
}