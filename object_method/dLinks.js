/**
 * Created by NYK-007 on 2017-01-21.
 */

//==================================
//Required
//==================================

var exports = module.exports={};
var appRoot = require('app-root-path');
var config  = require(appRoot +'/config.js');
//var dLinks    = require(appRoot +'/objects/dLinks.js');

//=============================================================================
//create     (dLinks)                                                     [16]
//=============================================================================
    exports.create_dLinks = function(dLinks) {
        var dbType=config.getDBtype();
            //console.log(' 5 - connection ok.');
                var param= [dLinks.amount,
                            dLinks.refUserId,
                            dLinks.isBonus,
                            dLinks.loginName,
                            dLinks.accountName,
                            dLinks.accountNumber,
                            dLinks.bankName,
                            dLinks.branchName,
                            dLinks.ifscCode,
                            dLinks.mobile,
                            dLinks.email,
                            dLinks.isPaid];
    var str='';

    if(dbType=="mysql") {
        str = 'CALL create_dlinks(?,?,?,?,?,?,?,?,?,?,?,?)';
    }

    else {
        str='sqlite query';
    }
    return {param:param,str:str};
};


//==============================================================================
//Delete  (dLinks)                                                        [17]
//==============================================================================
exports.delete_dLinks = function(dLinks) {

    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [dLinks.idDlinks];

    var str='';

    if(dbType=="mysql")
    {
        str ='CALL delete_dlinks(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
