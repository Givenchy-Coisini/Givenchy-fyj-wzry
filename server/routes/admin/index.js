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
        const items =  await Category.find().populate('parent').limit(10)
        res.send(items)
     })
     // todo获取详情页
     router.get('/categories/:id',async(req,res)=>{
        const model =  await Category.findById(req.params.id)
        res.send(model)
     })
     // 修改
    router.put('/categories/:id',async(req,res)=>{
        const model =  await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
     })
     //删除
    router.delete('/categories/:id',async(req,res)=>{
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
     })
    app.use('/admin/api',router)
}