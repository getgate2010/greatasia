/**
 * Created by DfastQ-2 on 1/9/2016.
 */

//REQUIRE
//============================================================
var exports =module.exports={};
var validation = require('validator');
var appRoot = require('app-root-path');

//===============================================================
//Validation
//===============================================================

exports.checkUser= function (user,arrayList){

    for (var i = 0; i < arrayList.length; i++) {
        var res = check(arrayList[i], user[arrayList[i]]);

        if (res.error) {
            return res;
        }

    }

    return {error:false, msg:"Success"} ;
}

function check(valid,str) {

    switch (valid) {

        case'userName':
            if (!validation.isLength(str, 1, 45)) {
                console.log('Validation Error !! userName ');
                return {error: true, msg: "userName: require & MAX char is 45"};
            }
            break;

        case'loginName':
            if (!validation.isLength(str, 1, 45)) {
                console.log('Validation Error !!  loginName');
                return {error: true, msg: "loginName: require & MAX char 45"};
            }
            break;
        case'password':
            if (!validation.isLength(str, 1, 45)) {
                console.log('Validation Error !!  password');
                return {error: true, msg: "password: require & MAX char 45"};
            }
            break;
        case'address':
            if (!validation.isLength(str, 1, 100)) {
                console.log('Validation Error !!  password');
                return {error: true, msg: "address: require & MAX char 100"};
            }
            break;


    }
    return{error:false,msg:"Success"};
}