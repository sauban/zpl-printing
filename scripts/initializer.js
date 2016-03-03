var _$ = function(str){
   return document.querySelector(str);
};
window.onload = init();
function init() {
    if (localStorage.getItem("name") !== null) {
        process.printer = localStorage.getItem("name");
    } else {
        window.location.assign("settings.html")
    }

}
