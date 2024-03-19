const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const dairySchema=new Schema ({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}
},{timeStamps:true});
module.exports=mongoose.model( "Dairy",dairySchema );
