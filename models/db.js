const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FypDB' , { useNewUrlParser:true},(err)=>{
if(!err) {console.log('MongoDB Connection Succeeded')}
});

require('./fyp.model');
