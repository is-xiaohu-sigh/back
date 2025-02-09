// 导入express宽假
const express  =require('express')
// 创建express实例
const app = express()
// 导入body-parser
var bodyParser = require('body-parser')
// 导入cors
const cors = require('cors')
// 全局挂载
app.use(cors())

//引入multer,Multer时一个node.js中间件，用于处理Multipar/form-data类型的表单数据，它主要用于文件上传
const multer = require('multer')
//在server服务器端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({dest:'./public/upload'})
app.use(upload.any())
//静态托管
app.use(express.static("./public"))


// parse application/x-www-form-
// 当extended为false时，值为数组或字符串，当值为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// 用于处理json格式数据
app.use(bodyParser.json())

app.use((req,res,next)=>{
	// status=0为成功，=1为失败，默认为1，方便处理失败的情况
	res.cc = (err,status=1)=>{
		res.send({
			status,
			//判断err对象是Error类型还是字符串并提取其中的信息
			message:err instanceof Error ? err.message : err,
		})
	}
	next()
})

//密钥
const jwtconfig= require('./jwt_config/index.js')
const {expressjwt:jwt} = require('express-jwt')
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter=require('./router/login')
const Joi =require('joi')
app.use('/api',loginRouter)
const userRouter = require('./router/userinfor.js')
app.use('/user',userRouter)
// 对不符合joi规则的情况进行报错
app.use((err,req,res,next)=>{
	//判断err对象是Joi.ValidationError类型还是字符串并提取其中的信息
	if(err instanceof Joi.ValidationError) return res.cc(err)
})

// 绑定和侦听指定的主机和端口
app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})