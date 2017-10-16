/**
 * Created by DfastQ-2 on 1/9/2016.
 */

//REQUIRE
//============================================================

var exports     = module.exports={};
var appRoot     = require('app-root-path');
var validation   = require('validator');


//VALIDATION
//=======================================================================
exports.checkRegistration= function (registration,arrayList){

    for (var i = 0; i < arrayList.length; i++) {
        var res = check(arrayList[i], registration[arrayList[i]]);

        if (res.error) {
            return res;
        }

    }

    return {error:false, msg:"Success"} ;
};

function check(valid,str) {

    switch (valid) {
        case'address':
            if (!validation.isLength(str, 1, 100)) {
                console.log('Validation Error !! address ');
                return {error: true, msg: "address: require & MAX char is 100"};
            }
            break;

        case'minesAddress':
            if (!validation.isLength(str, 1, 100)) {
                console.log('Validation Error !!  minesAddress');
                return {error: true, msg: "MinesAddress: require & MAX char 100"};
            }
            break;
        case'ownerName':
            if (!validation.isLength(str, 0, 45)) {
                console.log('Validation Error !!  ownerName');
                return {error: true, msg: "OwnerName: require & MAX char 45"};
            }
            break;

    }
    return{error:false,msg:"Success"};
}