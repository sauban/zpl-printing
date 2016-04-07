var pusher = new Pusher('ee7c5bd2b1e87e7d5f2e', {
  encrypted: true
});

pusher.connect(function(a){
    console.log(a);
});
var channel = pusher.subscribe('printer_channel');
channel.bind('print', function(data) {
    var config = qz.configs.create(process.printer);
    config.reconfigure({
        altPrinting:false,
        colorType:"color",
        copies:"1",
        density:"",
        duplex:false,
        encoding:"",
        endOfDoc:"",
        interpolation:"",
        jobName:"",
        margins:"0",
        orientation:"",
        paperThickness:"",
        perSpool:"1",
        printerTray:"",
        rotation:"0",
        scaleContent:true,
        size:null,
        units:"in"
    })
    var printData = [
        {
            type: 'raw',
            format: 'base64',
            data: data.data
        }
    ];

    qz.print(config, printData).catch(function(err){
         _$('#error').innerHTML = '<h3 style="color: red;">An error as occurred</h3>' + '<h4>' + err + '</h4>';
    });
});
