module.exports = app => {
    const express = require('express')
    const router = express.Router(
        { mergeParams: true } //合并路由参数  因为是在app.use定义的参数 在路由中用到了参数
    )
    // const Category = require('../../models/Category')

    // 提交新的分类
    router.post('/', async (req, res) => {
        //采用通用接口以后需要  找到对应的模型 小写复数改为大写单数
        // const Model = require(`../../models/${req / params.resource}`)
        // 获取到前端req传过来的数据 并返回给前端
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 查全部(列表)
    router.get('/', async (req, res) => {
        let queryOptions = {}
        // 有的页面需要关联有的页面不需要
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    // todo获取详情页
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // rest风格   :resource 通用接口风格  匹配任意资源
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        // todo 先在中间件中转换 然后next去调用router
        //采用通用接口以后需要 inflection  找到对应的模型 小写复数改为大写单数
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router) // express 子路由挂载上去
    // 处理图片
    const multer = require('multer')
    const upload = multer({dest:__dirname +'../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}