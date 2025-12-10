const mongoose=require('mongoose');
const roleSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    name:{
        type:String,
    },
    
    email:{
        type:String,
        required:true 
    },
   
    ward:{
        type:String,
      
    },
   officeType: {
        type: String,
        enum: ["Head Office", "Sub Office"],
    }, 
    officeName: {
        type: String,
    }, 
})
module.exports=mongoose.model('Role',roleSchema)