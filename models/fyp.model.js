const mongoose = require('mongoose');

var fypSchema = new mongoose.Schema({
batch_Year :{type:String,
    required: 'This field is required.'},
roll_No:{type:String},
email: {
    type: String
},
student_Name:{type:String},
project_Name:{type:String},
project_Supervisor:{type:String},
external_Supervisor:{type:String},
co_Supervisor:{type:String},
project_id:{type:String
    }
});

fypSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


mongoose.model('Fyp',fypSchema);