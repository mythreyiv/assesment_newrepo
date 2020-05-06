const express=require('express')
const router=express.Router()
require('./routes/standup.js')(router)
module.exports=router