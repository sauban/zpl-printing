var exec = require('child_process').exec;
var fs = require('fs');
var printer = require('printer');

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
  return printZebra(toprint, process.printer);
});
