const mongoose=require('mongoose')
const standupSchema=new mongoose.Schema({
    Pdtname:{type:String},
    Pdtdesc:{type:String},
    PdtPrice:{type:Number},
    Manufdate:{type:Date,default:Date.now},
    Expdate:{type:Date,default:Date.now},
    barcode:{type:String}
})
module.exports=mongoose.model('Standup',standupSchema)