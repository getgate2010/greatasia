/**
 * Created by DfastQ-2 on 1/8/2016.
 */

//==================================
//Required
//==================================

var exports =module.exports={};
var appRoot = require('app-root-path');
var config=require(appRoot +'/config.js');

//==========================================================================================================================
//create     (user)                                                     [1]
//==========================================================================================================================
    exports.create_user=function(user) {
        var dbType=config.getDBtype();

            var param= [user.address,
                        user.mobile,
                        user.email,
                        user.loginName,
                        user.password,
                        user.sponserId];
            var str='';

            if(dbType=="mysql") {
                str = 'CALL create_user(?,?,?,?,?,?)';
            }

            else {
                str='sqlite query';
            }

            return {param:param,str:str};
        };

//=================================================================================================================
//Read     (Login)                                                      [2]
//=================================================================================================================
exports.read_login =function(user) {
    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [user.loginName,
                 user.password];


    var str='';

    if(dbType=="mysql") {
        if(config.getDfqActivation()==true)
        {
            str = 'CALL read_login(?,?)';

        }
        else
        {
            str = 'CALL read_login_demo(?,?)';

        }

    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//===============================================================================================================
//Read  (User-check-login_name )                                        [3]
//==============================================================================================================
    exports.read_user_check_login_name =function(user) {

            var dbType=config.getDBtype();
                // console.log(' 5 - connection ok.');
                    var param = [user.loginName];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL read_user_check_login_name(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};


//===============================================================================================================
//Read  (UserBy_Id )                                                    [4]
//==============================================================================================================
exports.read_UserBy_Id =function() {

    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [config.getUserId()];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL read_user_byid(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//=============================
// read read_list_newIds_byUser
//============================
exports.read_list_newIds_byUser =function() {

    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL read_list_newIds_byUser()';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
//============================================

// read read_list_newIds_byAdmin
//============================
exports.read_list_newIds_byAdmin =function() {

    var dbType=config.getDBtype();
    // console.log(' 5 - connection ok.');
    var param = [];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL read_list_newIds_byAdmin()';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
//====================================================================================================================
//Update (User)                                                         [5]
//====================================================================================================================
    exports.update_user=function(user) {

        var dbType=config.getDBtype();
            // console.log(' 5 - connection ok.');
                var param = [config.getUserId(),
                             user.accountName,
                             user.accountNumber,
                             user.bankName,
                             user.branchName,
                             user.ifscCode
                             ];
    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user(?,?,?,?,?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};


//=====================================================================================================================
//Update    (user_approve)                                               [6]
//=====================================================================================================================
    exports.update_userApprove = function() {

        var dbType=config.getDBtype();
            //  console.log(' 5 - connection ok.');

                var param = [config.getUserId()];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_approve(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
//===========================================================

exports.update_userId_canceled = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [user.idUser];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_userId_canceled(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};
//=========================================================

exports.update_userId_checked = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [user.idUser];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_userId_checked(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};

//=====================================================================================================================
//Update    (user_bank_detail)                                           [7]
//=====================================================================================================================
exports.update_user_bank_detail = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [config.getUserId(),
                 user.accountName,
                 user.accountNumber,
                 user.bankName,
                 user.branchName,
                 user.ifscCode,
                 user.accountType,
                 user.panNumber
                 ];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_bank_detail(?,?,?,?,?,?,?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};



//=====================================================================================================================
//Update    (user_id_detail)                                               [8]
//=====================================================================================================================
exports.update_userId_detail = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [config.getUserId(),
        user.address,
        user.mobile,
        user.email];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_id_detail(?,?,?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};



//=====================================================================================================================
//Update    (user_password)                                               [9]
//=====================================================================================================================
exports.update_user_password = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [config.getUserId(),
                 user.pw,
                 user.newpassword];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_password(?,?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};


//=====================================================================================================================
//Update    (user_bank_detail_comm)                                      [10]
//=====================================================================================================================
exports.update_user_bank_detail_comm = function(user) {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [config.getUserId(),
                 user.accountName,
                 user.accountNumber,
                 user.bankName,
                 user.branchName,
                 user.ifscCode,
                 user.accountType,
                 user.panNumber,
                 user.commAmount];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_bank_detail_comm(?,?,?,?,?,?,?,?,?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};


//=====================================================================================================================
//Update    (user_block)                                                 [11]
//=====================================================================================================================
exports.update_userBlock = function() {

    var dbType=config.getDBtype();
    //  console.log(' 5 - connection ok.');

    var param = [config.getUserId() ];

    var str='';

    if(dbType=="mysql") {
        str = 'CALL update_user_block(?)';
    }

    else {
        str='sqlite query';
    }

    return {param:param,str:str};
};


