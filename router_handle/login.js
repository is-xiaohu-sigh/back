const db = require('../db/index.js')

exports.register=(req,res)=>{
	// req前端传过来的数据 ，也就是request
	// res返回给给前端的数据，也就是response
	const reginfo = req.body
	if(!reginfo.account||!reginfo.password){
		return res.send({
			statusL:1,
			message:'账号或者密码不能为空'
		})
	}
	// 第二步，判断前端传过来的账号有没有已经存在数据表中
	// 需要mysql的select语句
	const sql = 'select * from users where account = ?'
	db.query(sql,reginfo.account,err,results=>{
		if(results.length>0){
			return res.send({
				statusl:1,
				message:'账号已存在'
			})
		}
		// 第三步，对密码进行加密
		// 需要使用加密中间件bcrypt.js
		reginfo.password = bcrypt.hashSync(reginfo.password,10)
		// 第四步，把账号和密码插入users表里面
		const sql1 = 'insert into users set ?'
		const identity='用户'
		const create_time=new Data()
		db.query(sql1,{
			account:reginfo.account,
			password:reginfo.password,
			// 身份
			identity,
			// 创建时间
			create_time,
			// 初始未冻结状态为0
			status:0
		},(err,results)=>{
			// 第一个，插入失败
			// affectedRows为影响行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
			if(results.affectedRows !==1){
				return res.send({
					statusL:1,
					message:'注册账号失败'
				})
			}
			res.send({
				statusL:1,
				message:'注册账号成功'
			})
		})
	})
}
exports.login=(req,res)=>{
	res.send("登录")
}