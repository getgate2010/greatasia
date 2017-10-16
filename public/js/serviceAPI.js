var aa = angular.module('ServiceApp', ['LocalStorageModule']);
aa.factory("BLogin", function ($http, localStorageService) {
    return {
        read: function (login, cb) {
            var result = null;
            var err = false;
            var token=null;
            $http({
                method: 'POST',
                url: getDfQroot() + "dfq_api/read_login",
                data: JSON.stringify(login),
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if(data.err==false)
                {
                    err = false;
                    result = data.msg;
                    token = data.token;
                    return cb(err, result, token);
                }
                else
                {
                    err = true;
                    result = data.msg;
                    token="0";
                    return cb(err, result, token);
                }
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        updateBankCommt: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_user_bank_detail_comm',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        updatePaymentApprove: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_payment_approve',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        updatePaymentBlock: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_payment_block',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        updatePaymentImage: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_payment_img',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        update_userId_canceled: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_userId_canceled',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        update_userId_checked: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_userId_checked',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        saveId: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_user_id_detail',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        saveBankDetail: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_user_bank_detail',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        resetPw: function (firmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_user_password',
                data: JSON.stringify(firmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        createfirm: function(firmRegistration,cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + "dfq_api/create_user",
                data: JSON.stringify(firmRegistration),
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        createDlinks: function(dlinks,cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + "api/create_dLinks",
                data: JSON.stringify(dlinks),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        createPayment: function(admin,cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + "api/create_payment",
                data: JSON.stringify(admin),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        readPayment: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_payment',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        read_list_newIds_byUser: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_list_newIds_byUser',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        read_list_newIds_byAdmin: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_list_newIds_byAdmin',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        readGethelp: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_gethelp',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        read_list_pay48: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_list_pay48',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        }
    };
});
aa.factory("Bsetting", function ($http, localStorageService) {
    return {
        create: function (myapi, myparam, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + myapi,
                data: JSON.stringify(myparam),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        update: function (updtfirmRegistration, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_registration',
                data: JSON.stringify(updtfirmRegistration),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        resetPw: function (reset, cb) {
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/update_password',
                data: JSON.stringify(reset),
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        },
        readFirm: function(cb){
            var result = null;
            var err = false;
            $http({
                method: 'POST',
                url: getDfQroot() + 'api/read_registration_byid',
                headers: { "Authorization": localStorageService.get('token') }
            }).success(function (data) {
                err = false;
                result = data.msg;
                return cb(err, result);
            }).error(function () {
                err = true;
                return cb(err, result);
            });
        }
    };
});



/*
 aa.factory("Bemployee", function ($http, localStorageService) {
 return {
 create: function (addEmployee,cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/create_employee",
 data: JSON.stringify(addEmployee),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },

 list: function (cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/read_employee_list',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });

 },

 del: function (idEmp, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/update_employee_resign',
 data: { "idemployee": idEmp },
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 update: function (editEmp,cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/update_employee",
 data: JSON.stringify(editEmp),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 }
 };
 });
 aa.factory("Bcustomer", function ($http, localStorageService) {
 return {
 create: function (addCustomer, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/create_customer",
 data: JSON.stringify(addCustomer),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },

 list: function (cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/read_list_customer',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });

 },

 del: function (idEmp, cb) {
 var result = null;
 var err = false;

 },
 update: function (editCustomer,cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/update_customer",
 data: JSON.stringify(editCustomer),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 }
 };
 });
 aa.factory("Bsupplier", function ($http, localStorageService) {
 return {
 create: function (addSupp,cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/create_supplier",
 data: JSON.stringify(addSupp),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },

 list: function (cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/read_list_supplier',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 update: function (editSup,cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + "api/update_supplier",
 data: JSON.stringify(editSup),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 }
 };
 });
 aa.factory("Bproduct", function ($http, localStorageService) {
 return {
 create: function (myapi, myparam, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + myapi,
 data: JSON.stringify(myparam),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 list: function (myapi, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + myapi,
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 createMaal: function (dash, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/create_maal',
 data: JSON.stringify(dash),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 productListSet: function (cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/read_product_set',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });

 },
 update: function (myapi, myparam, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + myapi,
 data: JSON.stringify(myparam),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 }
 };
 });
 aa.factory("Bbill", function ($http, localStorageService) {
 return {
 qkcreate: function (cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/create_quick_purchaseBill',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 alert(result);
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 createStock: function(cb){
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/create_purchaseStock',
 data:{},
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 deleteStockProduct:function(id,cb){
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/delete_purchaseStock',
 data: {purchaseStockId:id},
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 update: function (updtfirmRegistration, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/update_registration',
 data: JSON.stringify(updtfirmRegistration),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 resetPw: function (reset, cb) {
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/update_password',
 data: JSON.stringify(reset),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 updateSetProduct: function(setprod,cb){
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/update_product_set',
 data: JSON.stringify(setprod),
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 },
 readFirm: function(cb){
 var result = null;
 var err = false;
 $http({
 method: 'POST',
 url: getDfQroot() + 'api/read_registration_byid',
 headers: { "Authorization": localStorageService.get('token') }
 }).success(function (data) {
 err = false;
 result = data.msg;
 return cb(err, result);
 }).error(function () {
 err = true;
 return cb(err, result);
 });
 }
 };
 });
 */
