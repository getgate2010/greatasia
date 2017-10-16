/**
 * Created by NYK-007 on 01/22/2017.
 */

//==================================
//Required
//==================================

var exports = module.exports={};
var appRoot = require('app-root-path');
var config  = require(appRoot +'/config.js');

//===================================================================================
//create     (payment)                                                         [12]
//===================================================================================
exports.create_payment = function(payment) {
    var dbType=config.getDBtype();
    //console.log(' 5 - connection ok.');
    var param= [payment.amount,
                payment.refUserId,
                payment.isBonus,
                payment.targetUserId,
                payment.loginName,
                payment.accountName,
                payment.accountNumber,
                payment.bankName,
                payment.branchName,
                payment.ifscCode,
                payment.mobile,
                payment.email,
                payment.sourceLoginName,
                payment.sourceAccountName,
                payment.sourceMobile,
                payment.sourceAddress,
                payment.idDlinks];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL create_payment(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    }


    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
//==================================================================================
//Update (payment_approve)                                                     [13]
//==================================================================================
exports.update_paymentApprove=function(payment) {

    var dbType=config.getDBtype();
    //console.log(' 5 - connection ok.');

    var param =[payment.refUserId,payment.idPayment];

    var str='';

    if(dbType=="mysql") {

        str = 'CALL update_payment_approve(?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//==================================================================================
//Update (payment_block)                                                       [14]
//==================================================================================
exports.update_paymentBlock=function(payment) {

    var dbType=config.getDBtype();
    //console.log(' 5 - connection ok.');

    var param =[payment.refUserId,payment.idPayment];

    var str='';

    if(dbType=="mysql") {

        str = 'CALL update_payment_block(?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//=================================================================================
//Update (payment_img)                                                         [15]
//=================================================================================
exports.update_paymentImg=function(payment) {

    var dbType=config.getDBtype();
    //console.log(' 5 - connection ok.');

    var param =[payment.idPayment,
                payment.imgLoc];

    var str='';

    if(dbType=="mysql") {

        str = 'CALL update_payment_img(?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//--------------   READ -------------------------------------
exports.read_gethelp =function() {
    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [config.getUserId()];
    var str='';
    if(dbType=="mysql") {
        str = 'CALL read_gethelp(?)';
    }
    else {
        str='sqlite query';
    }
    return {param:param,str:str};
};
exports.read_payment =function() {
    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [config.getUserId()];
    var str='';
    if(dbType=="mysql") {
        str = 'CALL read_payment(?)';
    }
    else {
        str='sqlite query';
    }
    return {param:param,str:str};
};

exports.read_list_pay48 =function() {
    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [];
    var str='';
    if(dbType=="mysql") {
        str = 'CALL read_list_pay48()';
    }
    else {
        str='sqlite query';
    }
    return {param:param,str:str};
};