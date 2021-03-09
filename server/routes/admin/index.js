module.exports =  app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')
    // 提交新的分类
    router.post('/categories',async(req,res)=>{
    // 获取到前端req传过来的数据 并返回给前端
       const model =  await Category.create(req.body)
       res.send(model)
    })
    // 查全部(列表)
    router.get('/categories',async(req,res)=>{
        const items =  await Category.find().limit(10)
        res.send(items)
     })
    app.use('/admin/api',router)
}