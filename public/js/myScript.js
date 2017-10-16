    function isNumber(evt) {  // this prevents all things except number
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    function isNumberKey(evt)  // this prevents all except numbers & decimal point
    {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;

        return true;
    }

    function refreshMe() {
        window.location.reload();
    }


    //This below code will block by pressing f12 key for inspecting elements and also block right click of mouse for inspecting elements
   
    //$(document).keydown(function (event) {
    //    if (event.keyCode == 123) {
    //        return false;
    //    }
    //    else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    //        return false;
    //    }
    //});

    //$(document).on("contextmenu", function (e) {
    //    e.preventDefault();
    //});
    
   