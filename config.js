/**
 * Created by js-2 on 1/9/2017.
 */
//=========================================
// Required
//=========================================
var exports    = module.exports={};
var appRoot    = require('app-root-path');
var express    = require("express");
var jwt        = require('jsonwebtoken');
var mysql      = require('mysql');
var config     = require(appRoot + '/config.js');
var bodyParser = require("body-parser");
var app        = express();
var fs         = require("fs");
var path       = require('path');
var mysqlDump  = require('mysqldump');
app.use(bodyParser.json());

//+++++++++++++++++++++++++++ MODIFICATION  parameters +++++++++++++++++++++++++++++++++++++++++++++++

exports.getOnlinePoint = function (){
    //ONLINE_POINT  false means offline (single-user , multi-user)  and  true means  online.
    return true;
};

exports.getMultiUser = function (){
    // MultiUser false means  single  and true means multi users.
    return false;
};

exports.getDfqActivation = function (){
    // DFQactivation false means  DEMO and true means Activated.
    return true;
};

exports.getDBtype = function (){
    return "mysql";
};
// ++++++++++++++++++++++++++ MODIFICATION parameters END ++++++++++++++++++++++++++++

//*****************************local variables***************************

var userId=0;
var firmId=0;
var userRoles=[];

exports.host = '';
exports.user = '';
exports.password = '';
exports.database = '';
exports.multiUserHostName ='NYK-007-PC';        //For clientServer DataBase HostName
exports.singleUserHostName ='127.0.0.1';       //For SingleUser DataBase HostName its-constance

//***********************************END local variables*************************************

//++++++++++++++++++++++++++++++++DataBase Credentials+++++++++++++++++++++++++++++++-

if(config.getOnlinePoint()==true)
{
    /*config.host = "godbless.czh4ipm2cfxc.us-west-2.rds.amazonaws.com";
    config.user = 'godbless';
    config.password = 'godbless';
    config.database = 'donation';*/
   config.host = "testingdb.cpxqczrhtptp.us-west-2.rds.amazonaws.com";
   config.user = 'testingDB';
   config.password = 'testingDB';
   config.database = 'donation';
}

else
{

    if(config.getMultiUser()==false)                 // single User D.B Credentials
    {

        config.host     = config.singleUserHostName;
        config.user     = 'DFQtmsUser';
        config.port     =  3306;
        config.password = 'DfastQ1234';
        config.database = 'donation';
    }

    else                                              // multi User D.B Credentials
    {
        config.host     = config.multiUserHostName;
        config.user     = 'DFQtmsUser2';
        config.port     =  3306;
        config.password = 'DfastQ12342';
        config.database = 'donation';
    }
}

//++++++++++++++++++++++++++++++DataBase Credentials END+++++++++++++++++++++++++++++++=

//********************************************END CONNECTION***********************************************************

//+++++++++++++++++++++++++++++++ File-System AccessPath+++++++++++++++++++++++++++++++++

if(config.getOnlinePoint()==false) {
//+++++++++++++++++++++++
// getServerImagePath  ||
//+++++++++++++++++++++++
    exports.getServerImgPath = function () {

        if (config.getMultiUser() == false) {
            var dirPath1 = 'C:/Patient Documents';  //For Single User
            return dirPath1;
        }

        else {

            var dirPath2 = '\\\\' + config.multiUserHostName + '\\c\\Patient Documents';
            return dirPath2;
        }                                                       //For Client Server


    };


//+++++++++++++++++++++++
// getServerScanImgPath ||
//+++++++++++++++++++++++
    exports.getScanImgPath = function () {

        if (config.getMultiUser() == false) {
            var dirPath2 = 'C:/ScanFile';  //For Single User
        }

        else {

            var dirPath2 = 'C:/ScanFile';      //multiUser
        }
        console.log("dirPath2==" + dirPath2);
        return dirPath2;

    };


//+++++++++++++++++++++++
// getDataBackupPath   ||
//+++++++++++++++++++++++
    exports.getDataBackupPath = function () {

        if (config.getMultiUser() == false) {
            var dirPath1 = 'C:/DB BACKUP';    //For Single User
        }

        else {

            var dirPath1 = 'C:/DB BACKUP';    //For multiUser
        }

        return dirPath1;
    };

    //+++++++++++++++++++++++
    //  DataBackup CODE    ||
    //+++++++++++++++++++++++
//--------------------------------------------
    var dir3 = config.getDataBackupPath();
    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
    }
//--------------------------------------------
    exports.getNowDT= function (){
        var dt = new Date();
        return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear()  ;
    };

    var destination='C:/DB BACKUP/AMS'+' '+config.getNowDT()+'.sql';
    if(config.getMultiUser()==false)                   // single user
    {


        mysqlDump({
            host: config.singleUserHostName,
            user: 'DFQtmsUser',
            port:  3306,
            password: 'DfastQ1234',
            database: 'donation',
            dest:destination // destination file
        },function(err){
            // create data.sql file;
        });

    }
//--------------------------------------------------------------------------
    else                                              // multiUser
    {
        mysqlDump({
            host: config.multiUserHostName,
            user: 'DFQtmsUser',
            port:  3306,
            password: 'DfastQ1234',
            database: 'donation',
            dest:destination // destination file
        },function(err){
            // create data.sql file;
        });

    }
}
//+++++++++++++++++++++++
//    END DataBackup   ||
//+++++++++++++++++++++++


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Cloudinary Config!!!!!!!!!!!!!!!!!!!!!!!

exports.getCloudName = function () {
    return "whitwmission";
};

exports.getApiKey = function () {
    return "694244786958571";
};

exports.getApiSecret = function () {
    return "Bj5Bas1CBYsqGwpC1FNQ92x5bso";
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Cloudinary Config END!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! COMMON APPLICATION START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//**************************************START CONNECTION*********************************************************


exports.DBaction =function(param,str,curd,cb,res) {
    var dbType = config.getDBtype();//===================================
    if (dbType == "mysql") {
        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            port:config.port,
            password: config.password,
            database: config.database,
            debug: false,
            multipleStatements: true
        });

        connection.connect(function (err) {

            if(!err) {
                console.log("Database is connected ... ");
            }
            else {
                console.log("Error connecting database ... ");
                return cb(err, 'D.B Connection failed !!');
            }
        });

//-----------------------------------If error,End Connection-----------------------------------------------

        console.log(' 5 - connection ok.');

        connection.query(str, param, function (err, rows) {
            connection.end();                     // if connection query error connection.end

            if (err) {
                console.log(' 7 - data Execute failed !');

                return cb(err, 'data Execute failed !');
            }

            else {
                console.log(' 8 - data Execute successfully  !');
                // convert array to json object
                var myid;

                switch (curd) {
                    case 'create':
                        myid = rows[0][0].id;
                        break;

                    case 'update':
                        myid = 'success';
                        break;

                    case 'read':
                        myid = rows[0];
                        break;

                    case 'readMultiread':
                        var rr = [];
                        for (var i = 0; i < rows.length - 1; i++) {
                            rr.push(rows[i]);
                        }
                        myid = rr;
                        break;

                    case  'delete':
                        myid = 'success';
                        break;
                }

                return cb(false, myid);
            }

        });

    }

};

//***************************************END CONNECTION***********************************************************

exports.getUserId = function () {

    return userId;

};
exports.getFirmId = function () {

    return firmId;

};
exports.getLimit = function () {

    return 5;

};

//server DateTime
exports.getNowDMY = function () {
    var dt = new Date();
    return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

//Set Increment Month
exports.incrementMonth = function (month) {
    var CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() + month);
    return CurrentDate;

};

//Convert DD-MM-YYYY to YYYY-MM-DD format//
exports.nuaDate = function (usDate) {
    var dateParts = usDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    var str = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
    return str;
};



function DFQsecret() {

    return 'dfq11122016';
};

exports.getToken = function (obj) {

    var token = jwt.sign(obj, DFQsecret());
    return token;

};

exports.isUserInRole = function (roles) {
    var res = false;
    var i;
    for (i in roles) {
        if (userRoles.indexOf(roles[i]) > -1) {
            res = true;
        }
    }
    return res;
};

exports.verifyToken = function (token) {
    try {
        var decoded = jwt.verify(token, DFQsecret());
        userId = decoded.userId;
        firmId = decoded.firmId;
        userRoles = decoded.userRoles;
        return true;

    }
    catch (err) {
        return false;
    }
};

exports.getUniqueName = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4() + '-q' + Math.floor(( Math.random()) * 100) + 'a' + Math.floor(( Math.random()) * 100);
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!COMMON APPLICATION END!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
