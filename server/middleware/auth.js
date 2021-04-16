module.exports = options =>{
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req, res, next) => {
        // 校验用户是否登录
        // 前端在请求头的时候传
        const token = String(req.headers.authorization || '').split(' ').pop()
        console.log(token)
        assert(token,401,'请提供token')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id,401,'无效的jwt token')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}