const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const schema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Article', schema)