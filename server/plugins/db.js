module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/fyj-wzry-server',{ useNewUrlParser: true, useUnifiedTopology: true })
}