const express = require ('express');
var router = express.Router();
const mongoose = require('mongoose');
const Fyp = mongoose.model('Fyp');


router.get('/', (req,res)=>{
    res.render("fyp/addOrEdit",{
        viewTitle: "Insert Fyp"
    });
});


router.post('/',(req,res)=>{
    if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

function insertRecord(req,res){
var fyp= new Fyp();
     fyp.batch_Year=req.body.batch_Year;
     fyp.roll_No=req.body.roll_No;
     fyp.email=req.body.email;
     fyp.student_Name=req.body.student_Name;
     fyp.project_Name=req.body.project_Name;
     fyp.project_Supervisor=req.body.project_Supervisor;
     fyp.external_Supervisor=req.body.external_Supervisor;
     fyp.co_Supervisor=req.body.co_Supervisor;
     fyp.project_id=req.body.project_id;
     fyp.save((err, doc) => {
         if(!err)
              res.redirect('fyp/list');
         else{
             if (err.name == 'ValidationError') {
                   handleValidationError(err, req.body);
                    res.render("fyp/addOrEdit",{
                    viewTitle: "Insert Fyp",
                     fyp : req.body
                     });
                 }
                else
                       console.log('Error during record insertion : ' + err);
             }
     });
}

function updateRecord(req, res) {
    Fyp.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('fyp/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("fyp/addOrEdit", {
                    viewTitle: 'Update Fyp',
                    fyp: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Fyp.find((err, docs) => {
        if (!err) {
            res.render("fyp/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});
function handleValidationError(err,body){
   for(field in err.errors){
       switch (err.errors[field].path){
           case 'batch_Year':
           body['batch_YearError'] = err.errors[field].message;
           break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }

     }
   }
   router.get('/:id', (req, res) => {
    Fyp.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("fyp/addOrEdit", {
                viewTitle: "Update Fyp",
                fyp: doc
            });
        }
    });
});
router.get('/delete/:id', (req, res) => {
    Fyp.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/fyp/list');
        }
        else { console.log('Error in Fyp delete :' + err); }
    });
});

module.exports=router;