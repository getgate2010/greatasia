var aa = angular.module('AMSApp', ['ui.router', 'ngFileUpload', 'ngMessages', 'angucomplete-alt', 'LocalStorageModule', 'ServiceApp']);
// DIRECTIVE START ========================
aa.directive('datetimepicker', function ($filter) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model
            ngModel.$render = function () {
                element.find('input').val(ngModel.$viewValue || '');
            }
            //element.datetimepicker({
            //    language: 'it'
            //});
            element.on('dp.change', function () {
                scope.$apply(read);
            });
            read();
            function read() {
                var value = element.find('input').val();
                value = $filter('date')(value, 'dd-MM-y');
                ngModel.$setViewValue(value);
            }
        }
    }
});
aa.directive('popover', function($compile){
    return {
        restrict : 'A',
        link : function(scope, elem){
            
            var content = $("#popover-content").html();
            var compileContent = $compile(content)(scope);
            var title = $("#popover-head").html();
            var options = {
                content: compileContent,
                html: true,
                title: title
            };
            
            $(elem).popover(options);
        }
    }
});
aa.directive('validNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
aa.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);
aa.directive('onLastRepeat', function ($timeout) {
    return function (scope, elm, attrs) {
        if (scope.$last) {
            $timeout(function () {
                scope.$eval(attrs.onLastRepeat);

            });
        }
    };
});
aa.directive('ensureUnique', ['$http','localStorageService', function ($http, localStorageService) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            ele.on('blur', function () {
                scope.$watch(attrs.ngModel, function () {
                    $http({
                        method: 'POST',
                        url: getDfQroot() + attrs.dfqurl,
                        data: { 'str': ele.val() },
                        headers: { "Authorization": localStorageService.get('token') }
                    }).success(function (data, status, headers, cfg) {
                        var res = true;
                        if (data.msg[0].count == 1) {
                            res = false;
                        }
                        c.$setValidity('unique', res);
                    }).error(function (data, status, headers, cfg) {
                        c.$setValidity('unique', false);
                    });
                });

            });
        }
    }
}]);
// DIRECTIVE END ========================

// FILTER START ==========================
aa.filter('comma2decimal', [
    function () { // should be altered to suit your needs
        return function (input) {
            var ret = (input) ? input.toString().trim().replace(",", "") : null;
            ret = Math.round(ret);
            return parseFloat(ret);
        };
    }]);
aa.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 25;
        if (end === undefined)
            end = "...";
        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }
    };
});
aa.filter('cutword', function () {
    return function (inputword) {
        var str = inputword;
        var str_array = str.split(',');
        for (var i = 0; i < str_array.length; i++) {
            // Trim the excess whitespace.
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
            // Add additional code here, such as:

            return (str_array[i]);
        }
    }

});
aa.filter('num', function () {
    return function (input) {
        return parseInt(input, 10);
    }
});
// FILTER END ==========================

// controller START ===========================
aa.controller('mainCtrl', function ($scope, $location, localStorageService, $rootScope,$http) {
    //$scope.showheading = false;
    $scope.$root.userName = "";
    $scope.$root.app = localStorageService.get('app');
    $scope.$root.userName = localStorageService.get('userName');
    $scope.$root.role = localStorageService.get('role');

    $scope.logoutme = function () {
        $scope.$root.app = "";
        $scope.$root.userName = "";
        $scope.$root.role = "";
        $('.showMe1').removeClass('hidden');
        $('.showMe2').addClass('hidden');
        localStorageService.clearAll();
        $location.path('/home');
    }
});
//---------login Controller strats HERE-------
aa.controller('loginCtrl', function ($scope, $rootScope, $location, $timeout, $http, $timeout, localStorageService, BLogin,$filter) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
    $scope.errordiv = false;
    var token;
    $scope.login = { loginName: "", password: "" };
    $scope.processLogin = function () {
        $scope.setLoading(true);
        BLogin.read($scope.login, function (err, result, token) {
            if (err == true) {
                $scope.setLoading(false);
                showmwNoData();
                $scope.errordiv = true;
            }
            else {
                $scope.setLoading(false);
                $scope.errordiv = false;
                $scope.$root.role = result[0].status;
                $scope.$root.accountName = result[0].accountName;
                $scope.$root.userName = result[0].loginName;
                $scope.$root.idUser = result[0].idUser;
                if (localStorageService.isSupported) {
                    var isPaid =result[0].isPaid;
                    localStorageService.set('token', token);
                    localStorageService.set('accountName', result[0].accountName);
                    localStorageService.set('accountNumber', result[0].accountNumber);
                    localStorageService.set('accountType', result[0].accountType);
                    localStorageService.set('bankName', result[0].bankName);
                    localStorageService.set('branchName', result[0].branchName);
                    localStorageService.set('ifscCode', result[0].ifscCode);
                    localStorageService.set('commAmount', result[0].commAmount);
                    localStorageService.set('getAmount', result[0].getAmount);
                    localStorageService.set('bonusAmount', result[0].bonusAmount);
                    localStorageService.set('isactive', result[0].isactive);
                    localStorageService.set('userName', result[0].loginName);
                    localStorageService.set('userId', result[0].idUser);
                    localStorageService.set('role', result[0].status);
                    localStorageService.set('address', result[0].address);
                    localStorageService.set('mobile', result[0].mobile);
                    localStorageService.set('email', result[0].email);
                    localStorageService.set('onDate', $filter('date')(result[0].onDate, 'y-MM-dd') );
                    localStorageService.set('dateDif', result[0].dateDif);
                    localStorageService.set('isPaid', isPaid);
                    if (result[0].isactive==0){
                        $location.url('/bankdetail');
                    }
                    else {
                        $location.url('/dashboard');
                    }

                }

                else {
                    alert('Your browser is not SUPPORT for this App, Kindly using Google Crome (latest version)..')
                }
            }
        });
    }
});
aa.controller('homeCtrl', function ($scope, $rootScope, $location) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
});
aa.controller('aboutCtrl', function ($scope, $rootScope, $location) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
});
aa.controller('howCtrl', function ($scope, $rootScope, $location) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
});
aa.controller('bankdetailCtrl', function ($scope, $rootScope, $http, $location, storeObj, $timeout, Upload, localStorageService, BLogin) {

    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }

    $scope.updateBankDeailCommt = function () {
        $scope.setLoading(true);
        $scope.dashboardUser.accountType="saving";
        $scope.dashboardUser.panNumber="pan number";
        BLogin.updateBankCommt($scope.dashboardUser, function (err, result, token) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                if (localStorageService.isSupported) {
                    localStorageService.set('commAmount', $scope.dashboardUser.commAmt);
                    localStorageService.set('accountName', $scope.dashboardUser.accountName);
                    localStorageService.set('accountNumber', $scope.dashboardUser.accountNumber);
                    localStorageService.set('accountType', $scope.dashboardUser.accountType);
                    localStorageService.set('bankName', $scope.dashboardUser.bankName);
                    localStorageService.set('branchName', $scope.dashboardUser.branchName);
                    localStorageService.set('ifscCode', $scope.dashboardUser.ifscCode);
                    $location.url('/dashboard');
                }
                else {
                    alert('Your browser is not SUPPORT for this App, Kindly using Google Crome (latest version)..')
                }
            }
        });
    }


});
aa.controller('contactCtrl', function ($scope, $rootScope, $location) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
});
//---------registration Controller strats HERE-------
aa.controller('firmRegistrationCtrl', function ($scope, $rootScope, $http, $location, storeObj, $timeout, Upload, localStorageService, BLogin) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
    $scope.firmRegistration = {
        sponsorId:"", loginName:"",password:"",reEnterPassword:"",mobileNumber:"",email:"",address:""
    }
    $scope.regFirmInfo = function () {
        $scope.setLoading(true);
        BLogin.createfirm($scope.firmRegistration, function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                $scope.firmRegistration.firmId = result;
                storeObj.setValue($scope.firmRegistration);
                localStorageService.set('firmId', $scope.firmRegistration.firmId);
                $location.url('/login');
            }
        });
    }

    $scope.resetPw=function(){
        $scope.setLoading(true);
        BLogin.resetPw($scope.firmRegistration, function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                $location.url('/login');
            }
        });
    }
    $scope.complain=function(){
        showmeSuccess();
        $location.url('/dashboard');
        /*  $scope.setLoading(true);
         BLogin.complain($scope.firmRegistration, function (err, result) {
         if (err == true) {
         $scope.setLoading(false);
         showmeDataErr();
         }
         else {
         $scope.setLoading(false);
         showmeSuccess();
         $location.url('/dashboard');
         }
         });*/
    }

});

aa.controller('editCtrl', function ($scope, $rootScope, $http, $location, storeObj, $timeout, Upload, localStorageService, BLogin) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    $scope.setLoading = function (loading) {
        $scope.isLoading = loading;
    }
    $scope.edit = {};
    $scope.loadme=function(){
        $scope.edit.accountName=localStorageService.get('accountName');
        $scope.edit.accountNumber=localStorageService.get('accountNumber');
        $scope.edit.accountType=localStorageService.get('accountType');
        $scope.edit.bankName=localStorageService.get('bankName');
        $scope.edit.branchName=localStorageService.get('branchName');
        $scope.edit.ifscCode=localStorageService.get('ifscCode');
        $scope.edit.mobile=localStorageService.get('mobile');
        $scope.edit.email=localStorageService.get('email');
        $scope.edit.address=localStorageService.get('address');
        $scope.edit.sponsorId=localStorageService.get('userName');
        $scope.edit.onDate=localStorageService.get('onDate');
        $scope.edit.dateDif=localStorageService.get('dateDif');
    }
    $scope.saveBankDetail=function(){
        $scope.setLoading(true);
        BLogin.saveBankDetail($scope.edit, function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                localStorageService.set('accountName',$scope.edit.accountName);
                localStorageService.set('accountNumber',$scope.edit.accountNumber);
                localStorageService.set('accountType',$scope.edit.accountType);
                localStorageService.set('bankName',$scope.edit.bankName);
                localStorageService.set('branchName',$scope.edit.branchName);
                localStorageService.set('ifscCode',$scope.edit.ifscCode);
                $location.url('/dashboard');
            }
        });
    }
    $scope.saveId=function(){
        $scope.setLoading(true);
        BLogin.saveId($scope.edit, function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                localStorageService.set('address', $scope.edit.address);
                localStorageService.set('mobile', $scope.edit.mobile);
                localStorageService.set('email', $scope.edit.email);
                $location.url('/dashboard');
            }
        });
    }
    $scope.getHelpFn=function(){
        BLogin.readGethelp(function (err, result) {
            if (err == true) {
                console.log("read payment error in main.js file 0014")
            }
            else {
                $scope.getHelps= result;
            }
        });
    }
    $scope.counterFn=function(countDownDate1)
    {
        var res="";
        // Set the date we're counting down to
        var countDownDate = new Date(countDownDate1).getTime();
// Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            res= days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                res= "EXPIRED";
            }
            alert(res);
        }, 1000);

    }
    $scope.pay48Fn=function(){
        BLogin.read_list_pay48(function (err, result) {
            if (err == true) {
                console.log("read payment error in main.js file 0014")
            }
            else {
                $scope.getHelps= result[1];
                $scope.payMoneys= result[0];
            }
        });
    }
    $scope.updatePaymentApprove=function(refUserId,idPayment){
        var firmRegistration={};
        firmRegistration.refUserId=refUserId;
        firmRegistration.idPayment=idPayment;
        $scope.setLoading(true);
        BLogin.updatePaymentApprove(firmRegistration,function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                window.location.reload();
            }
        });
    }
    $scope.updatePaymentBlock=function(refUserId,idPayment){
        var firmRegistration={};
        firmRegistration.refUserId=refUserId;
        firmRegistration.idPayment=idPayment;
        $scope.setLoading(true);
        BLogin.updatePaymentBlock(firmRegistration,function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                window.location.reload();
            }
        });
    }
    $scope.viewSlipImage2=function(imgLoc){
        if(imgLoc==""||imgLoc=="x"||imgLoc==null||imgLoc==undefined)
            imgLoc="No_image_u8dvvh.png";
        $scope.printImagePAN=getImageRoot().concat(imgLoc);
        // $scope.dashboardUserprintImagePAN=getImageRoot()+imgLoc;
    }
    $scope.getNewUserIdsFn= function () {
        BLogin.read_list_newIds_byUser(function (err, result) {
            if (err == true) {
                console.log("read read_list_newIds_byUser error in main.js file 001855")
            }
            else {
                $scope.newUserIds= result;
            }
        });
    }
    $scope.UserIdsChecked=function(idUser){
        var firmRegistration={};
        firmRegistration.idUser=idUser;
        $scope.setLoading(true);
        BLogin.update_userId_checked(firmRegistration,function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                window.location.reload();
            }
        });
    }
    $scope.UserIdsCanceled=function(idUser){
        var firmRegistration={};
        firmRegistration.idUser=idUser;
        $scope.setLoading(true);
        BLogin.update_userId_canceled(firmRegistration,function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
                window.location.reload();
            }
        });
    }


    $scope.admin={
        amount:0,refUserId:0,isBonus:0,targetUserId:0,loginName:'',accountName:'',
        accountNumber:'',bankName:'',branchName:'',ifscCode:'',mobile:'',
        email:'',sloginName:'',saccountName:'',smobile:'',sAddress:'',idDlinks:0
    };

    $scope.getHelpCreditorFn=function(idDlinks,isBonus,targetUserIdNamedRef,loginName,amount,accountName,accountNumber,bankName,branchName,ifscCode,mobile,email){
        $scope.admin.idDlinks=idDlinks;
        $scope.admin.isBonus=isBonus;
        $scope.admin.targetUserId=targetUserIdNamedRef;
        $scope.admin.loginName=loginName;
        $scope.admin.amount=amount;
        $scope.admin.accountName=accountName;
        $scope.admin.accountNumber=accountNumber;
        $scope.admin.bankName=bankName;
        $scope.admin.branchName=branchName;
        $scope.admin.ifscCode=ifscCode;
        $scope.admin.mobile=mobile;
        $scope.admin.email=email;
    }

    $scope.payMoneyFn= function (refUserId,sloginName,saccountName,smobile,sAddress) {
        $scope.admin.refUserId=refUserId;
        $scope.admin.sloginName=sloginName;
        $scope.admin.saccountName=saccountName;
        $scope.admin.smobile=smobile;
        $scope.admin.sAddress=sAddress;
    }

    $scope.payMoneyFn2= function () {
       alert("hiiii");
    }

    $scope.createPaymentFn=function(){
        $scope.setLoading(true);
        BLogin.createPayment($scope.admin,function (err, result) {
            if (err == true) {
                $scope.setLoading(false);
                showmeDataErr();
            }
            else {
                $scope.setLoading(false);
                showmeSuccess();
            }
        });
    }


});

//---------Employee controller starts HERE----------------------
aa.controller('dashboardCtrl', function ($scope, $location, $rootScope, $http, $filter, localStorageService,BLogin,Upload) {
    $scope.setRoute = function (route) {
        $location.path(route);
    }
    if (localStorageService.get('token') == null) {
        $location.url('/');
    }
    else {
        $scope.setLoading = function (loading) {
            $scope.isLoading = loading;
        }
        $scope.remoteUrlRequestFn = function (str) {
            return { q: str };
        }
        $scope.dashboardUser = {
            sponsorId:"", mobile:"",email:"",address:"",
            status:"",accountName:"",accountNumber:"",accountType:"",bankName:"",branchName:"",
            ifscCode:"",panNumber:"",isactive:"",commAmount:"", getAmount:"", bonusAmount:"",
            onDate:"",dateDif:""
        };
        $scope.retriveDashboard= function(){
            $scope.dashboardUser.sponsorId=$scope.$root.userName;
            $scope.dashboardUser.mobile=localStorageService.get('mobile');
            $scope.dashboardUser.email=localStorageService.get('email');
            $scope.dashboardUser.address=localStorageService.get('address');
            $scope.dashboardUser.status=localStorageService.get('role');
            $scope.dashboardUser.accountName=localStorageService.get('accountName');
            $scope.dashboardUser.accountNumber=localStorageService.get('accountNumber');
            $scope.dashboardUser.accountType=localStorageService.get('accountType');
            $scope.dashboardUser.bankName=localStorageService.get('bankName');
            $scope.dashboardUser.branchName=localStorageService.get('branchName');
            $scope.dashboardUser.ifscCode=localStorageService.get('ifscCode');
            $scope.dashboardUser.panNumber=localStorageService.get('address');
            $scope.dashboardUser.isactive=localStorageService.get('isactive');
            $scope.dashboardUser.commAmount=localStorageService.get('commAmount');
            $scope.dashboardUser.getAmount=localStorageService.get('getAmount');
            $scope.dashboardUser.bonusAmount=localStorageService.get('bonusAmount');
            $scope.dashboardUser.onDate=localStorageService.get('onDate');
            $scope.dashboardUser.dateDif=localStorageService.get('dateDif');
            $scope.dashboardUser.isPaid=localStorageService.get('isPaid');
            // growth daily 5%, no, of days from reg, commit is user  paid amount
            //consideration is user get/collect amount
            // currentConsideration is growth + commit
            var days,commit,consideration,ispaid; // direct
            var growth,currentConsideration; // calculated
            ispaid=$scope.dashboardUser.isPaid;
            commit=parseInt($scope.dashboardUser.commAmount);
            days=parseInt($scope.dashboardUser.dateDif);
            consideration=parseInt($scope.dashboardUser.getAmount);

            if(days>=10){
                days=10;
            }

            if(ispaid==1 && days==10){
                // consideration amount not paid to user
                $scope.dashboardUser.getHelpFlag=true;
            }
            else {
                // user got/ collected consideration amount
                $scope.dashboardUser.getHelpFlag=false;
            }

            growth= parseInt(0.05 * commit*days);
            currentConsideration=parseInt(commit+growth);
            $scope.dashboardUser.growth=growth;
            $scope.dashboardUser.currentConsideration=currentConsideration;

            BLogin.readPayment(function (err, result) {
                if (err == true) {
                    console.log("read payment error in main.js file 0014")
                }
                else {
                    $scope.payments= result;
                }
            });




        }
        $scope.createDlinks= function(){
            $scope.dashboardUser.getHelpFlag=false;
            var firmRegistration= {};
            firmRegistration.amount=$scope.dashboardUser.currentConsideration;
            firmRegistration.refUserId=$scope.$root.idUser;
            firmRegistration.isBonus=0;
            firmRegistration.loginName=$scope.dashboardUser.sponsorId;
            firmRegistration.accountName=$scope.dashboardUser.accountName;
            firmRegistration.accountNumber=$scope.dashboardUser.accountNumber;
            firmRegistration.bankName=$scope.dashboardUser.bankName;
            firmRegistration.branchName=$scope.dashboardUser.branchName;
            firmRegistration.ifscCode=$scope.dashboardUser.ifscCode;
            firmRegistration.mobile=$scope.dashboardUser.mobile;
            firmRegistration.email=$scope.dashboardUser.email;
            firmRegistration.isPaid=$scope.dashboardUser.isPaid;
            $scope.setLoading(true);
            BLogin.createDlinks(firmRegistration, function (err, result) {
                if (err == true) {
                    $scope.setLoading(false);
                    showmeDataErr();
                    $scope.dashboardUser.getHelpFlag=true;
                }
                else {
                    logoutme();
                }
            });
        }
        $scope.viewSlipImage=function(imgLoc){
            if(imgLoc==""||imgLoc=="x"||imgLoc==null||imgLoc==undefined)
                imgLoc="No_image_u8dvvh.png";
            $scope.dashboardUser.printImagePAN=getImageRoot().concat(imgLoc);
        }
        $scope.uploadPic1 = function (file,idPayment) {
            if (file == '' || file == null || file == 'undefined') {
                // do nothing
            }
            else {
                file.upload = Upload.upload({
                    url: getDfQroot() + 'api/fileUpload',
                    data: { file: file },
                    headers: { "Authorization": localStorageService.get('token') }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                file.upload.success(function (data) {
                    $scope.panImgName = data.msg;
                    //$scope.imagePath1 = getImageRoot() + smallThumbNail + data.msg;
                    // now apply a callback function for inserting image link to database
                    $scope.updatePaymentImage($scope.panImgName,idPayment);
                });
            }
        };
        $scope.updatePaymentImage=function(imgLoc,idPayment){
            var firmRegistration={};
            firmRegistration.imgLoc=imgLoc;
            firmRegistration.idPayment=idPayment;
            BLogin.updatePaymentImage(firmRegistration,function (err, result) {
                if (err == true) {
                    showmeDataErr();
                }
                else {
                    showmeSuccess();
                }
            });
        }
    }
});
// controller END  ===========================
aa.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $httpProvider.interceptors.push('responseObserver');
    $urlRouterProvider.otherwise('/home');
    $stateProvider.
    state('login', {
        url: '/login',
        templateUrl: 'partial/login.html',
        controller: 'loginCtrl'
    }).
    state('home', {
        url: '/home',
        templateUrl: 'partial/home.html',
        controller: 'homeCtrl'
    }).
    state('about', {
        url: '/about',
        templateUrl: 'partial/about.html',
        controller: 'aboutCtrl'
    }).
    state('how', {
        url: '/how',
        templateUrl: 'partial/how.html',
        controller: 'howCtrl'
    }).
    state('contact', {
        url: '/contact',
        templateUrl: 'partial/contact.html',
        controller: 'contactCtrl'
    }).
    state('dashboard', {
        url: '/dashboard',
        templateUrl: 'partial/dashboard.html',
        controller: 'dashboardCtrl'
    }).
    state('bankdetail', {
        url: '/bankdetail',
        templateUrl: 'partial/bankDetail.html',
        controller: 'bankdetailCtrl'
    }).
    state('create', {
        url: '/create',
        templateUrl: 'partial/createForm.html',
        controller: 'createCtrl'
    }).
    state('firmRegistration', {
        url: '/firmRegistration',
        templateUrl: 'partial/firmRegistration.html',
        controller: 'firmRegistrationCtrl'
    }).

    state('complain', {
        url: '/complain',
        templateUrl: 'partial/complain.html',
        controller: 'firmRegistrationCtrl'
    }).
    state('edit', {
        url: '/edit',
        templateUrl: 'partial/edit.html',
        controller: 'editCtrl'
    }).
    state('getHelp', {
        url: '/getHelp',
        templateUrl: 'partial/getHelp.html',
        controller: 'editCtrl'
    }).
    state('newIds', {
        url: '/newIds',
        templateUrl: 'partial/newUserIds.html',
        controller: 'editCtrl'
    }).
    state('admin', {
        url: '/adminj1j1',
        templateUrl: 'partial/admin.html',
        controller: 'editCtrl'
    }).
    state('resetPw', {
        url: '/resetPw',
        templateUrl: 'partial/resetPassword.html',
        controller: 'firmRegistrationCtrl'
    })

}]);
aa.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('TMSApp');
});
// FACTORY START =================================
aa.factory('responseObserver', function responseObserver($q, $location) {
    return {
        'responseError': function (errorResponse) {
            switch (errorResponse.status) {
                case 403:
                    $location.url('/login');
                    break;
            }
            return $q.reject(errorResponse);
        }
    };
});
aa.factory('storeObj', function () {
    var factory = {};

    factory.value = null;

    factory.setValue = function (obj) {
        factory.value = obj;
    }

    factory.getValue = function () {
        return factory.value;
    }

    return factory;
});
// FACTORY END =================================