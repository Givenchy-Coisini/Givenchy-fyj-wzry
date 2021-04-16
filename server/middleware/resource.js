module.exports =options => {
    return async (req, res, next) => {
        // todo 先在中间件中转换 然后next去调用router
        //采用通用接口以后需要 inflection  找到对应的模型 小写复数改为大写单数
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}