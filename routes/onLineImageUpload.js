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
var cloudinary      = require ('cloudinary');
var app             = express();
var validation      = require('validator');
app.use(bodyParser.json());


module.exports = function(app) {

    var storage =   multer.diskStorage({
        imagename: function (req, file, callback) {
            callback(null,  'dfq.jpg');
        }
    });
// for multi storage data use multer------------------------
    var upload = multer({storage: storage}).array('file', 1);

//========================================cloudinary configuration ======================================
    cloudinary.config({
        cloud_name: config.getCloudName(),
        api_key: config.getApiKey(),
        api_secret: config.getApiSecret()
    });

    app.locals.api_key = cloudinary.config().api_key;
    app.locals.cloud_name = cloudinary.config().cloud_name;
//================================================================================================
    app.post('/api/fileUpload', function (req, res) {
        upload(req,res,function(err) {

            if(err) {
                console.log("Error uploading image.");
                return res.end("Error uploading image.");
            }
            else {

                console.log(req.files[0].path);
                cloudinary.uploader.upload(req.files[0].path,function(result)  //in upload time image resize
                    {
                        console.log(result);
                        var msgg= "v" + result.version+"/" + result.public_id + "." + result.format;
                        res.send({err:false,msg:msgg })},
                    {height: 408, quality: 48, width: 640, crop: "scale"},
                    {width: 515, crop: "scale"},
                    {width: 405, crop: "scale"});

                //imageStream.on('data', cloudStream.write).on('end', cloudStream.end);

                console.log("4 Final multer work success");

            }

        });

    });
//======================================================================================================================
//*** DOWNLOAD FILE ***                                                       [27]
//=====================================================================================================================
    app.get('/api/download', function(req, res){

        // get method with parameter value==================
        ultraSound.patientId  = req.query.patientId;
        ultraSound.scanNumber = "-";
        ultraSound.image      = validation.trim(req.query.image);
        ultraSound.slno       = 0;
        ultraSound.flag       = 'oth';
        ultraSound.fileName   = validation.trim(req.query.fileName);
        console.log( ultraSound.image);
        // got params values========================

        var file         = config.getServerImgPath() + '\\' + ultraSound.image;
        var myExtname    = path.extname(file);
        var myUnqName    = "DfQ-"+ config.getUniqueName() + myExtname;
        ultraSound.image = myUnqName;



        //Now here object is validate then it should be submitted at database
        var queryString = ultraSoundMethod.create_ultraSound(ultraSound);
        config.DBaction(queryString.param, queryString.str, 'create', function (err, rows) {
            if(err){
                res.status(500);
                res.json({err:true,msg:"Fail to insert DATA !!!"});
                res.end();
            }
            else
            {
                res.status(201);
                //*****FILE DOWNLOAD******
                res.download(file,myUnqName);   // Set disposition and send it.
            }
        });
    });


};
