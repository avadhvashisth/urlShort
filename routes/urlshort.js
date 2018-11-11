const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Url = require('../models/url');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/url',urlencodedParser, (req,res,next)=>{
    let newurl = new Url({
        url:req.body.url,
        uniqueId:uniqueid()
    });
    Url.addUrl(newurl,(err,data)=>{
        if(err){
            res.json({success:false,msg:'unable to add url'});
        } else{
            res.json({url: 'https://frozen-temple-15659.herokuapp.com/api/url/'+newurl.uniqueId});
        }
    });
});

router.get('/url/:uniqueid',(req,res,next) => {
    var uniqueid = req.params.uniqueid;
    Url.findUrl(uniqueid,(err,urlid)=>{
        if (err) throw err;
        if(!urlid){
            return res.json({success:false,msg:'url not found!!'});
        }else{
            res.redirect(urlid.url);
        }

    });
});

router.post('/custom',urlencodedParser, (req,res,next)=>{
    console.log();
    let newurl = new Url({
        url:req.body.url,
        name:req.body.name
    });
    console.log(req.body.url);
    Url.addUrl(newurl,(err,data)=>{
        if(err){
            res.json({success:false,msg:'unable to add url'});
        } else{
            res.json({url: 'https://frozen-temple-15659.herokuapp.com/api/custom/'+newurl.name});
        }
    });
});

router.get('/custom/:name',(req,res,next) => {
    var name = req.params.name;
    Url.findCustomUrl(name,(err,urlid)=>{
        if (err) throw err;
        if(!urlid){
            return res.json({success:false,msg:'url not found!!'});
        }else{
            res.redirect(urlid.url);
        }

    });
});

router.get('/history', (req, res, next) => {
    Url.find({}, (err, urls) => {
        if(err) throw err;
        res.render('history', { urls });
    });
});

function uniqueid(){
    return  Math.floor(Math.random() * (50000 - 30)) + 50000;
}
module.exports = router;