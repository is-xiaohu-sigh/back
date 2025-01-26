const joi  = require('joi')

// string值只能为字符串
// alphanum值为 a-z A-Z 0-9
// min是最小长度,max是最大长度
// require是必填项
// pattern是正则

const id = joi.required()
const name = joi.string().pattern(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,10}$/).required()
const email = joi.string().pattern(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/)
const oldPassword =joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newPassword =joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
exports.name_limit = {
	body:{
		id,
		name
	}
}
exports.email_limit={
	body:{
		id,
		email
	}
}
exports.password_limit={
	body:{
		id,
		oldPassword,
		newPassword
	}
}