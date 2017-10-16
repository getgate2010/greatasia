/**
 * Created by DfastQ-2 on 2016-04-09.
 */


//=======================================================
//REQUIRE
//=======================================================
var appRoot        = require('app-root-path');
var validation     = require('validator');
var dLinksMethod     = require(appRoot +'/object_method/dLinks.js');
var config         = require(appRoot +'/config.js');
var dLinks={};
module.exports = function(app) {

//================================================================================
// CREATE   (dLinks)                                                          [16]
// ===============================================================================
    //create dLinks data into Database
    app.post('/api/create_dLinks', function (req, res) {

        //here I pass the value through body parameter to api parameter
        dLinks.amount       = req.body.amount;
        dLinks.refUserId    = req.body.refUserId;
        dLinks.loginName    = req.body.loginName;
        dLinks.accountName  = req.body.accountName;
        dLinks.accountNumber= req.body.accountNumber;
        dLinks.bankName     = req.body.bankName;
        dLinks.branchName   = req.body.branchName;
        dLinks.ifscCode     = req.body.ifscCode;
        dLinks.mobile       = req.body.mobile;
        dLinks.email        = req.body.email;
        dLinks.isBonus      = req.body.isBonus;
        dLinks.isPaid       = req.body.isPaid;

            //Now here object is validate then it should be submitted at database
            var queryString = dLinksMethod.create_dLinks(dLinks);
            config.DBaction(queryString.param, queryString.str, 'create', function (err, rows) {
                if(err){
                    res.status(500);
                    res.json({err:true,msg:"Fail to insert DATA !!!"});
                    res.end();
                }
                else
                {
                    res.status(201);
                    res.json({err:false,msg:rows});
                    res.end();
                }

            });

    });



//================================================================================
//DELETE (dLinks)                                                              [17]
//================================================================================
    //Delete setting data into Database
    app.post('/api/delete_dLinks', function (req, res) {

        var idDlinks = req.body.idDlinks;

            var queryString = dLinksMethod.delete_dLinks(idDlinks);
            config.DBaction(queryString.param, queryString.str, 'delete', function (err, rows) {
                if (err)   //if object is not validate send error msg.
                {
                    res.status(500);
                    res.json({err:true,msg:"Fail to delete DATA !!!"});
                    res.end();

                }
                else {
                    res.status(203);
                    res.json({err:false,msg:'Delete success'});
                    res.end();
                }
            });
    });
};
