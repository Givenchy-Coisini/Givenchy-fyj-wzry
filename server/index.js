const express = require('express')

const app = express()
app.use(express.json())

//解决跨域问题
app.use(require('cors')())

//处理静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 引用过来是一个函数 所以要调用一下
require('./routes/admin/index')(app)  // todo 因为在admin 导出的是一个函数 在这里要调用一下

require('./plugins/db')(app) //? 数据库

app.listen('3000', () => {
    console.log('http://localhost:3000')
})
//看到了第六个
