const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
 img:{
   
    type:String,
    required:true
 },
 title:{
    type:String,
    required:true
 },
 category:{
    type:String,
    required:true   
 },
 price:{
    type:String,
    required:true
 },
description:{
    type:String
},
stock:{
   type:Number,
   required:true
}
 
});

module.exports = mongoose.model("Inventory", inventorySchema);