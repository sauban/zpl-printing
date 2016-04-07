var _$ = function(str){
   return document.querySelector(str);
};

window.onload = init();
function init() {
    qz.websocket.connect().then(function(data) {
        _$('#notifier').innerHTML = '<h4>Successfully connected to QZ</h4>';
      if (localStorage.getItem("name") !== null) {
         return qz.printers.find(localStorage.getItem("name"));
      } else {
          return false;
      }
  }).then(function(data){
      if(!data){
          window.location.assign("settings.html");
      }
       process.printer = data;
       _$('#notifier').innerHTML = _$('#notifier').innerHTML + '<h4>Successfully connected to printer: ' + process.printer +' </h4>';
  }).catch(function(err){
      _$('#error').innerHTML = '<h3 style="color: red;">An error as occurred</h3>' + '<h4>' + err + '</h4>';
  });

}
