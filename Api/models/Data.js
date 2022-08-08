const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema(
    {
    
      
        img: {type:String, required:true},
    
        id:{type:Number,required:true },
     


        
        
    },{ timeStamps:true}
    );

    module.exports = mongoose.model('Data',DataSchema)