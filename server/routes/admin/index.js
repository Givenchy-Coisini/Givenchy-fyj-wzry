module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router(
        { mergeParams: true } //合并路由参数  因为是在app.use定义的参数 在路由中用到了参数
    )
    // const Category = require('../../models/Category')

    // 创建资源
    router.post('/', async (req, res) => {
        //采用通用接口以后需要  找到对应的模型 小写复数改为大写单数
        // const Model = require(`../../models/${req / params.resource}`)
        // 获取到前端req传过来的数据 并返回给前端
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 查全部(列表) 资源列表
    router.get('/', async (req, res) => {
        let queryOptions = {}
        // 有的页面需要关联有的页面不需要
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    // todo获取详情页 资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //登录校验中间件
    const authMiddle = require('../../middleware/auth')
    const resourceMiddle = require('../../middleware/resource')
    // rest风格   :resource 通用接口风格  匹配任意资源
    app.use('/admin/api/rest/:resource', authMiddle(), resourceMiddle(), router) // express 子路由挂载上去
    // 处理图片
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../uploads' })
    app.post('/admin/api/upload',authMiddle(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password')
        // 2.校验密码
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: "用户不存在"
        //     })
        // }
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '账号或密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: "账号或密码错误"
        //     })
        // }
        // 3.返回token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({ token })
    })
    //错误处理
    app.use(async (err, req, res, next) => {
        console.log('tag', err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}