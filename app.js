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

// parse application/x-www-form-
// 当extended为false时，值为数组或字符串，当值为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// 用于处理json格式数据
app.use(bodyParser.json())

const loginRouter=require('./router/login')
app.use('/api',loginRouter)
// 绑定和侦听指定的主机和端口
app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})