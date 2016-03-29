var exec = require('child_process').exec;
var fs = require('fs');
var printer = require('printer');
var http = require('http');

var pusher = new Pusher('ee7c5bd2b1e87e7d5f2e', {
  encrypted: true
});


function printZebra(text, name){
    printer.printDirect({data:text
            , printer: name
            , type: "RAW"
            , success:function(jobID){
                _$('#notifier').innerHTML = _$('#notifier').innerHTML + '<br />' + 'New job request sent to printer ' + process.printer.replace(/[_]/g, ' ') + ' with request ID ' + jobID;
                _$('#currentJob').innerHTML = printer.getJob(name, jobID).status;
                setTimeout(function(){
                _$('#currentJob').innerHTML = printer.getJob(name, jobID).status;
                }, 20000);
                    }
            , error:function(err){
                _$('#error').innerHTML = _$('#error').innerHTML + '<br />' + 'An error occurred: ' + err;
                }
        });
}

var channel = pusher.subscribe('printer_channel');
channel.bind('print', function(data) {
    var toprint = atob(data.data);
    var printRequest = new XMLHttpRequest();
    var printerName = process.printer;
    var query = "printerName="+ printerName +"&labelBytes="+ data.data;
    printRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            var message = {};
            message.requestType = "response";
            message.query = this.response;
            window.opener.postMessage(message, "'{8}'");
        }
    }

    printRequest.open("POST", "http://127.0.0.1:4349/print", true);
    printRequest.responseType = "text";
    printRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
    printRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    printRequest.send(query);

  return printZebra(toprint, process.printer);
});
