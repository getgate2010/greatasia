/**
 * Created by NYK-007 on 01/22/2017.
 */

//=======================================================
//REQUIRE
//=======================================================
var appRoot        = require('app-root-path');
var validation     = require('validator');
var config         = require(appRoot +'/config.js');
var paymentMethod= require(appRoot +'/object_method/payment.js');
var payment={};
module.exports = function(app) {

//==========================================================================================================
// CREATE   (payment)                                                              [12]
// =========================================================================================================
    //create payment data into Database
    app.post('/api/create_payment', function (req, res) {
        //here I pass the value through body parameter to api parameter
        payment.amount = req.body.amount;
        payment.refUserId = req.body.refUserId;
        payment.targetUserId = req.body.targetUserId;
        payment.loginName = req.body.loginName;
        payment.accountName = req.body.accountName;
        payment.accountNumber = req.body.accountNumber;
        payment.bankName = req.body.bankName;
        payment.branchName = req.body.branchName;
        payment.ifscCode = req.body.ifscCode;
        payment.mobile = req.body.mobile;
        payment.email = req.body.email;
        payment.sourceLoginName=req.body.sloginName;
        payment.sourceAccountName=req.body.saccountName;
        payment.sourceMobile=req.body.smobile;
        payment.sourceAddress=req.body.sAddress;
        payment.isBonus = req.body.isBonus;
        payment.idDlinks=req.body.idDlinks;

        //Now here object is validate then it should be submitted at database
        var queryString = paymentMethod.create_payment(payment);
        config.DBaction(queryString.param, queryString.str, 'create', function (err, rows) {
            if (err) {
                res.status(500);
                res.json({err: true, msg: "Fail to insert DATA !!!"});
                res.end();
            }
            else {
                res.status(201);
                res.json({err: false, msg: rows});
                res.end();
            }

        });

    });
//=====================================================================================================================
//Update (payment_approve)                                                          [13]
//======================================================================================================================
    //update payment data into Database
    app.post('/api/update_payment_approve', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from begning and end side

        payment.refUserId = req.body.refUserId;
        payment.idPayment=req.body.idPayment;

            //Now here object is validate then it should be submitted at database

            var queryString = paymentMethod.update_paymentApprove(payment);
            config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {
                if(err){
                    res.status(500);
                    res.json({err:true,msg:"Fail to update DATA !!!"});
                    res.end();
                }
                else
                {
                    res.status(202);
                    res.json({err:false,msg:rows});
                    res.end();
                }
            });


    });
//=====================================================================================================================
//Update (payment_block)                                                            [14]
//======================================================================================================================
    //update payment data into Database
    app.post('/api/update_payment_block', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from begning and end side

        payment.refUserId = req.body.refUserId;
        payment.idPayment=req.body.idPayment;


        //Now here object is validate then it should be submitted at database

        var queryString = paymentMethod.update_paymentBlock(payment);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {
            if(err){
                res.status(500);
                res.json({err:true,msg:"Fail to update DATA !!!"});
                res.end();
            }
            else
            {
                res.status(202);
                res.json({err:false,msg:rows});
                res.end();
            }
        });


    });
//=====================================================================================================================
//Update (payment_img)                                                              [15]
//======================================================================================================================
    //update payment data into Database
    app.post('/api/update_payment_img', function (req, res) {

        //Here am trim is  use to  elements  whitespace  from beginning and end side

        payment.idPayment = req.body.idPayment;
        payment.imgLoc    = req.body.imgLoc;

        //Now here object is validate then it should be submitted at database

        var queryString = paymentMethod.update_paymentImg(payment);
        config.DBaction(queryString.param, queryString.str, 'update', function (err, rows) {
            if(err){
                res.status(500);
                res.json({err:true,msg:"Fail to update DATA !!!"});
                res.end();
            }
            else
            {
                res.status(202);
                res.json({err:false,msg:rows});
                res.end();
            }
        });


    });

    //-------------------------- read-----------------------------------

    app.post('/api/read_gethelp', function (req, res) {

        var queryString = paymentMethod.read_gethelp(payment);
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

    app.post('/api/read_payment', function (req, res) {

        var queryString = paymentMethod.read_payment(payment);
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
    app.post('/api/read_list_pay48', function (req, res) {

        var queryString = paymentMethod.read_list_pay48();
        config.DBaction(queryString.param, queryString.str, 'readMultiread', function (err, rows) {
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


};