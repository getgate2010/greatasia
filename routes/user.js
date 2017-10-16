/**
 * Created by DfastQ-2 on 09/04/2016.
 */
//==============================================================
//REQUIRE
//==============================================================

var appRoot        = require('app-root-path');//This is used It redirect the root of Directory
var validation     = require('validator');
var userValidation = require(appRoot + '/validation/user.js');
var userMethod     = require(appRoot +'/object_method/user.js');
var config         = require(appRoot + '/config.js');
var os             = require("os");
var user={};
module.exports = function(app) {

//===============================================================
// CREATE    (user Admin)
//===============================================================
    //create user Admin data into Database
    app.post('/dfq_api/create_user', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from begin and end side
        user.address         = req.body.address;
        user.mobile          = req.body.mobileNumber;
        user.email           = req.body.email;
        user.loginName       = req.body.loginName;
        user.password        = req.body.password;
        user.sponserId       = req.body.sponsorId;

        var arryList=[  "loginName",
                        "password"];

        //  console.log('1- Pass,Route route OK');

        var valid = userValidation.checkUser(user,arryList);
        if (valid.error==true)
        {
            //  console.log('2- Validation failed');
            //if server side Validation failed
            res.status(501);
            res.json({err:true,msg:"server side Validation failed"});
            res.end();
        }
        else {
            //  console.log('3- Validation OK.');
            //Now here object is validate then it should be submitted at database

            var queryString = userMethod.create_user(user);
            config.DBaction(queryString.param, queryString.str, 'create', function (err, rows) {

                if(err){
                    console.log(err);
                    res.status(500);
                    res.json({err:true,msg:"Fail to insert DATA !!!"});
                    res.end();
                }
                else
                {
                    //  console.log(' 10 - data insert success !');
                    res.status(201);
                    res.json({err:false,msg:rows});
                    res.end();
                }

            });

        }
    });

//=============================================================
//READ  (Login)
//=============================================================
    //READ user-login data into Database
    app.post('/dfq_api/read_login', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side

        user.loginName= req.body.loginName;
        user.password = req.body.password;

        var queryString = userMethod.read_login(user);

        config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

            if(err){
                //  console.log(' 9 - data Read failed !');
                res.status(500);
                res.json({err:true,msg:"ERROR !! UserName and Password "});
                res.end();
            }
            else
            {
                // console.log(rows);
                var result={};
                var len=rows.length;
                if(len==1) {

                    var xobj ={

                        userId:rows[0].idUser,
                        firmId:rows[0].idUser,
                        userRoles:rows[0].status
                    };

                    var tkn =config.getToken(xobj);

                    result={err:false,msg:rows,token:tkn};

//------------------------------------------------------------------------------------------
                }
                else{
                    result={err:true,msg:"Invalid login"};
                }
                res.status(200);
                res.json(result);
                res.end();
            }
        });
    });


//=============================================================================
//READ  (User-check-login_name )
//=============================================================================
    //READ user-check-login_name data into Database
    app.post('/dfq_api/read_user_check_login_name', function (req, res) {


        //Here am trim is  use to  elements  whitespace  from begning and end side

        user.loginName = validation.trim(req.body.str);
        //.......................(Here am receive body(client) request value ).....................................................


        var queryString = userMethod.read_user_check_login_name(user);
        config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

            if(err){
                //  console.log(' 9 - data Read failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to read Data !!!"});
                res.end();
            }
            else
            {
                //  console.log(rows);
                res.status(200);
                res.json({err:false,msg:rows});
                res.end();
            }
        });

    });

//=============================================================================
//READ  (userBy_id )
//=============================================================================
    //READ user-check-login_name data into Database
    app.post('/dfq_api/read_user_byid', function (req, res) {

        //.......................(Here am receive body(client) request value ).....................................................


        var queryString = userMethod.read_UserBy_Id();
        config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

            if(err){
                //  console.log(' 9 - data Read failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to read Data !!!"});
                res.end();
            }
            else
            {
                //  console.log(rows);
                res.status(200);
                res.json({err:false,msg:rows});
                res.end();
            }
        });

    });

    //=============================================================================
//=============================================================================
    //READ read_list_newIds_byUser
    app.post('/api/read_list_newIds_byUser', function (req, res) {

        //.......................(Here am receive body(client) request value ).....................................................


        var queryString = userMethod.read_list_newIds_byUser();
        config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

            if(err){
                //  console.log(' 9 - data Read failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to read Data !!!"});
                res.end();
            }
            else
            {
                //  console.log(rows);
                res.status(200);
                res.json({err:false,msg:rows});
                res.end();
            }
        });

    });
//===============================================================
    //=============================================================================
    //READ read_list_newIds_byAdmin
    app.post('/api/read_list_newIds_byAdmin', function (req, res) {

        //.......................(Here am receive body(client) request value ).....................................................


        var queryString = userMethod.read_list_newIds_byAdmin();
        config.DBaction(queryString.param, queryString.str, 'read', function (err, rows) {

            if(err){
                //  console.log(' 9 - data Read failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to read Data !!!"});
                res.end();
            }
            else
            {
                //  console.log(rows);
                res.status(200);
                res.json({err:false,msg:rows});
                res.end();
            }
        });

    });
//===============================================================
//UPDATE    (user_bank_detail)
//===============================================================
    //update user data into Database
    app.post('/api/update_user_bank_detail', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side
        user.accountName   = req.body.accountName;
        user.accountNumber = req.body.accountNumber;
        user.bankName      = req.body.bankName;
        user.branchName    = req.body.branchName;
        user.ifscCode      = req.body.ifscCode;
        user.accountType   = req.body.accountType;
        user.panNumber     = 'xxxx';

        //Now here object is validate then it should be submitted at database

        var queryString = userMethod.update_user_bank_detail(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if (err) {
                console.log(err);
                res.status(500);
                res.json({err: true, msg: "Fail to update DATA !!!"});
                res.end();
            }
            else {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err: false, msg: rows});
                res.end();
            }
        });


    });


//================================================================
//UPDATE    (user_id_detail)
//================================================================
    //update user data into Database
    app.post('/api/update_user_id_detail', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side
        user.address   = req.body.address;
        user.mobile    = req.body.mobile;
        user.email     = req.body.email;

        var queryString = userMethod.update_userId_detail(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if (err) {
                //  console.log(' 9 - data update failed !');
                res.status(500);
                res.json({err: true, msg: "Fail to update DATA !!!"});
                res.end();
            }
            else {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err: false, msg: rows});
                res.end();
            }
        });


    });


//================================================================
//UPDATE    (user_password)
//================================================================
    //update user data into Database
    app.post('/api/update_user_password', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side
        user.pw             = req.body.oldpw;
        user.newpassword    = req.body.newpw;


        var queryString = userMethod.update_user_password(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if (err) {
                //  console.log(' 9 - data update failed !');
                res.status(500);
                res.json({err: true, msg: "Fail to update DATA !!!"});
                res.end();
            }
            else {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err: false, msg: rows});
                res.end();
            }
        });


    });


//=================================================================
//UPDATE    (user_bank_detail_comm)
//=================================================================
    //update user data into Database
    app.post('/api/update_user_bank_detail_comm', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side
        user.accountName   = req.body.accountName;
        user.accountNumber = req.body.accountNumber;
        user.bankName      = req.body.bankName;
        user.branchName    = req.body.branchName;
        user.ifscCode      = req.body.ifscCode;
        user.accountType   = req.body.accountType;
        user.panNumber     = req.body.panNumber;
        user.commAmount    = req.body.commAmt;

        var queryString = userMethod.update_user_bank_detail_comm(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if (err) {
                console.log(err);
                res.status(500);
                res.json({err: true, msg: "Fail to update DATA !!!"});
                res.end();
            }
            else {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err: false, msg: rows});
                res.end();
            }
        });


    });



//==================================================================
//UPDATE    (user_approve)
//==================================================================
    //update user-resign data into Database
    app.post('/api/update_user_approve', function (req, res) {


            var queryString = userMethod.update_userApprove();
            config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

                if(err){
                    //  console.log(' 9 - data update failed !');
                    res.status(500);
                    res.json({err:true,msg:"Fail to update DATA !!!"});
                    res.end();
                }
                else
                {
                    //  console.log(' 10 - data update success !');
                    res.status(202);
                    res.json({err:false,msg:rows});
                    res.end();
                }
            });


    });

    //==================================================================
//UPDATE    (update_userId_canceled)
//==================================================================
    //update update_userId_canceled
    app.post('/api/update_userId_canceled', function (req, res) {
        user.idUser   = req.body.idUser;
        var queryString = userMethod.update_userId_canceled(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if(err){
                //  console.log(' 9 - data update failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to update DATA !!!"});
                res.end();
            }
            else
            {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err:false,msg:rows});
                res.end();
            }
        });


    });
    //UPDATE    (update_userId_checked)
//==================================================================
    //update update_userId_checked
    app.post('/api/update_userId_checked', function (req, res) {
        user.idUser   = req.body.idUser;
        var queryString = userMethod.update_userId_checked(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if(err){
                //  console.log(' 9 - data update failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to update DATA !!!"});
                res.end();
            }
            else
            {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err:false,msg:rows});
                res.end();
            }
        });


    });

//================================================================
//UPDATE    (user_block)
//================================================================
    //update user-resign data into Database
    app.post('/api/update_user_block', function (req, res) {


        var queryString = userMethod.update_userBlock(user);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {

            if(err){
                //  console.log(' 9 - data update failed !');
                res.status(500);
                res.json({err:true,msg:"Fail to update DATA !!!"});
                res.end();
            }
            else
            {
                //  console.log(' 10 - data update success !');
                res.status(202);
                res.json({err:false,msg:rows});
                res.end();
            }
        });


    });


};