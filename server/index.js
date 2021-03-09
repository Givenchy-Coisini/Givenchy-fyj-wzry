const express = require('express')

const app = express()
app.use(express.json())

//解决跨域问题
app.use(require('cors')())
 // 引用过来是一个函数 所以要调用一下
require('./routes/admin/index')(app)

require('./plugins/db')(app)

app.listen('3000',()=>{
    console.log('http://localhost:3000')
})
