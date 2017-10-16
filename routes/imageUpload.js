/**
 * Created by DfastQ-2 on 2016-03-25.
 */

//=========================================
// Required
//=========================================
var appRoot         = require('app-root-path');
var express         = require("express");
var bodyParser      = require("body-parser");
var config          = require(appRoot + '/config.js');
var multer          = require('multer');
var app             = express();
var fs              = require('fs');
var fsExtra         = require('fs-extra');
var mkdirp          = require('mkdirp');
var path            = require('path');
var validation      = require('validator');

app.use(bodyParser.json());


module.exports = function(app) {

//-----if upload dir not exit create new directory----------------------
    var dir = "";
    mkdirp(dir, function (err) {
        if (err) {
            console.error(err)
        }
        else {
            //console.log('Image-Directory Create successfully!')
        }

    });
//-------------------------------------------------------------------------

    var dir7 = "";
    mkdirp(dir7, function (err) {
        if (err) {
            console.error(err)
        }
        else {
            //console.log('Download-Directory Create successfully!')
        }

    });

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, dir);  //where u want to save ur File
        },
        filename: function (req, file, callback) {
            callback(null, config.getUniqueName() +  path.extname(file.originalname));  //create unique Name
        }

    });
//------------------------------------------------------------------------[3]

// for multi storage data use multer------------------------
    var upload = multer({ storage : storage }).array('file',1);


//=====================================fileUpload=================================
    app.post('/api/fileUpload',function(req,res){
        upload(req,res,function(err) {

            if(err) {
                console.log("Error uploading file.");
                return res.end("Error uploading file.");
            }
            else {
                console.log("4 Final doc Upload SUCCESS");
                console.log(req.files);
                //return res.end("Upload Success");
                return res.send({err:false,msg:req.files[0].filename});
            }
        });
    });
};

