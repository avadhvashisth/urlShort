const mongoose = require('mongoose');
const config = require('../config/database');

const UrlSchema = mongoose.Schema({
    url:{
        type: String,
        required: true,
        unique: true,
    },
    uniqueId:{
        type: String,
        default: null,
    },
    name:{
    	type: String,
    	default: null,
    }
});

const url = module.exports = mongoose.model('urls',UrlSchema);


module.exports.addUrl = function(newurl,callback){
    newurl.save(callback);
};

module.exports.findUrl = function(uniqueid,callback){
    const query = {uniqueId:uniqueid};
    url.findOne(query,callback);
}

module.exports.findCustomUrl = function(name,callback){
    const query = {name:name};
    url.findOne(query,callback);
}
