const mongoose = require('mongoose');
//Schema des albums
const albumSchema = new mongoose.Schema({
    title : {type:String,unique:true,require:true},
    images:[String],
},{timestamps:true});
//exportation du schemas
module.exports=mongoose.model('Album',albumSchema);