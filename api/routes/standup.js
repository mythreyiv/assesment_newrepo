const Standup = require('../../models/standup')

module.exports = function(router) {
    router.post('/standup', function(req,res){
        let note = new Standup(req.body)
        note.save(function(err, note){
            if(err) { return res.status(404).json(err)}
            res.status(200).json(note)
        })
    })

    router.get('/standup', function(req,res){
        Standup.find({}, (err, standup)=>{
            if(err)
            {
                res.json({success:false, message:err});
            }
         
         else{
             if(!standup){ 
                 res.json({success:false , message: 'No standup found'});
             }
             else{
                 res.json({success: true , standup: standup});
                 }
         }
        })
     })
     
     router.put('/updateStandup',(req,res)=> {
        if(!req.body._id){
            res.json({ success: false , message: 'No standup Id provided'});
        }
        else{
            Standup.findOne({_id: req.body._id },(err, standup)=>{
                if(err) {
                    res.json({ success:false , message: 'Not a valid standup id'});
                }
                else{
                    standup.Pdtname= req.body.Pdtname;
                    standup.Pdtdesc= req.body.Pdtdesc;
                    standup.PdtPrice= req.body.PdtPrice;
                    standup.Manufdate= req.body.Manufdate;
                    standup.Expdate= req.body.Expdate;
                    standup.barcode= req.body.barcode;
                    standup.save((err) => {
                        if(err){
                            res.json({ success: false, message:err});
                        }
                        else{
                            res.json({ success: true, message:'Standup updated'}); 
                        }
                    });

                }
            });
        }
    });


    router.delete('/deleteStandup/:id',(req,res)=>{
        //check if ID was provided in parameters
        if(!req.params.id){
            res.json({success:false,message:'no id provided'});//return error message
        }else{
            //check if id is found in database
            Standup.findOne({_id:req.params.id},(err,standup)=>{
                //check if errors was found
                if(err){
                    res.json({success:false,message:'Invalid id'})//return error message
                }else{
                    //remove the standup from database
                    standup.remove((err)=>{
                        if(err){
                            res.json({success:false,message:err});//return error message
                        }else{
                            res.json({success:true,message:'standup deleted'});//return error message
                        }
                    });
                }
            });
        }
    });
   
}