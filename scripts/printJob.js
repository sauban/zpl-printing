var exec = require('child_process').exec;
var fs = require('fs');

var pusher = new Pusher('ee7c5bd2b1e87e7d5f2e', {
  encrypted: true
});

var channel = pusher.subscribe('printer_channel');
channel.bind('print', function(data) {
  var toprint = atob(data.data);
  fs.appendFileSync('label.zpl', toprint);
  const stru = 'lpr -l -P '+ process.printer + ' ' + __dirname + '/label.zpl';
  const child = exec(stru,
      (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
        fs.truncate('label.zpl', 0);
    });
});
