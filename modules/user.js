const mong=require('mongoose')

mong.connect('mongodb://localhost:27017/miniproject')

const schema=mong.Schema({
    name:String,
    email:String,
    Image:String
})

module.exports = mong.model("user",schema)