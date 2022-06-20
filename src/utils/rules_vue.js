// 手机号码
const phone = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
// 电话号码
const telePhone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
//身份证校验
const cardId1 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{1}[0-9Xx]\d{1}[0-9Xx]$/;
const cardId2 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{1}[0-9Xx]\d{1}[0-9Xx][1-7][1-4]$/;
//验证邮箱地址
const email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
//密码是6-20个字符之间，至少包含英文字母、数字、标点符号（除空格）中的两种
const pwd = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/);
//中文汉字
const chinese = /^[\u4e00-\u9fa5]{0,}$/;
//验证英文
const eglh = /^[A-Za-z]+$/;
//验证百分比
const percent = /^-?([0-9.]+)[ ]*%$/;
//验证银行卡号
var validateBankCard = /^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/;
//字符验证，只能包含中文、英文、数字、下划线、空格
var zfyz=/^[a-zA-Z0-9\u4e00-\u9fa5_ ]+$/;
//验证数字
var num = /^[0-9]*$/;
//验证是否为字母或数字
var flagPattern = /^[A-Za-z0-9]+$/; //是否为字母或数字
//验证金额,输入值只能为大于0或者正数，两位小数，其他符号不可输入
var price = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
//验证手机号码
var rulePhone = (rule, value, callback) => {
	if(value) {
		if(phone.test(value)) {
			callback()
		}else {
			callback(new Error("手机号码格式不正确"))
		}
	}else {
		callback()
	}
};
//验证电话号码
var ruleTelePhone = (rule, value, callback) => {
	if(value) {
		if(telePhone.test(value)) {
			callback()
		}else {
			callback(new Error("电话号码格式不正确"))
		}
	}else {
		callback()
	}
};
//验证身份证号码
var ruleId = (rule, value, callback) => {
	if(value) {
		if(cardId1.test(value)||cardId2.test(value)) {
			callback()
		}else {
			callback(new Error("身份证号码格式错误"))
		}
	}else {
		callback()
	}
};
//验证邮箱
var ruleEmail = (rule, value, callback) => {
	if(value) {
		if(email.test(value)) {
			callback()
		}else {
			callback(new Error("输入的邮箱格式不正确"))
		}
	}else {
		callback()
	}
};
//验证密码
var rulePwd = (rule, value, callback) => {
	if(value) {
		if(pwd.test(value)) {
			callback()
		}else {
			callback(new Error("输入的密码格式错误"))
		}
	}else {
		callback()
	}
};
//验证中文汉字
var ruleChinese = (rule, value, callback) => {
	if(value) {
		if(chinese.test(value)) {
			callback()
		}else {
			callback(new Error("只能输入纯中文汉字"))
		}
	}else {
		callback()
	}
};
//验证英文
var ruleEglh = (rule, value, callback) => {
	if(value) {
		if(eglh.test(value)) {
			callback()
		}else {
			callback(new Error("只能输入纯英文字母"))
		}
	}else {
		callback()
	}
};
//验证百分比
var rulePercent = (rule, value, callback) => {
	if(value) {
		if(percent.test(value)) {
			callback()
		}else {
			callback(new Error("请输入正确的百分比格式"))
		}
	}else {
		callback()
	}
};
//验证银行卡号
var ruleCard = (rule, value, callback) => {
	if(value) {
		if(validateBankCard.test(value)) {
			callback()
		}else {
			callback(new Error("请输入正确的银行卡号"))
		}
	}else {
		callback()
	}
};
//验证字符
var ruleZfyz = (rule, value, callback) => {
	if(value) {
		if(zfyz.test(value)) {
			callback()
		}else {
			callback(new Error("只能包含中文、英文、数字、下划线、空格"))
		}
	}else {
		callback()
	}
};
//验证阿拉伯数字
var ruleNum = (rule, value, callback) => {
	if(value) {
		if(num.test(value)) {
			callback()
		}else {
			callback(new Error("只能输入阿拉伯数字"))
		}
	}else {
		callback()
	}
};
//验证是否为字母和数字
var ruleFlagPattern = (rule, value, callback) => {
	if(value) {
		if(flagPattern.test(value)) {
			callback()
		}else {
			callback(new Error("只能输入字母或数字"))
		}
	}else {
		callback()
	}
};
//验证金额
var rulePrice = (rule, value, callback) => {
	if(value) {
		if(price.test(value)) {
			callback()
		}else {
			callback(new Error("只能输入大于0或者正数，两位小数，其他符号不可输入"))
		}
	}else {
		callback()
	}
};
export default {
	rulePhone,
	ruleTelePhone,
	ruleId,
	ruleEmail,
	rulePwd,
	ruleChinese,  
	ruleEglh,
	rulePercent,
	ruleCard,
	ruleZfyz,
	ruleNum,
	ruleFlagPattern,
	rulePrice
}