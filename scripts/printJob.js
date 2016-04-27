var pusher = new Pusher('ee7c5bd2b1e87e7d5f2e', {
  encrypted: true
});

pusher.connect(function(a){
    console.log(a);
});


function print(data) {
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
    });
    qz.print(config, data).catch(function(err){
         _$('#error').innerHTML = '<h3 style="color: red;">An error as occurred</h3>' + '<h4>' + err + '</h4>';
    });
}

var arrayList = [];

var channel = pusher.subscribe('printer_channel');
channel.bind('print', function(data) {
    var printData = [
        {
            type: 'raw',
            format: 'base64',
            data: data.data
        }
    ];
     if (data.text === null) {
        print(printData);
     } else {
         var liData = {
             name: data.text,
             data: printData
         };
         arrayList.push(liData);
         rerender();
     }

});

function rerender() {
    _$('#jobs').innerHTML = "<p>New shipments, click on the shipment to send to printer </p>";
    var list = document.getElementById("list");
    list.innerHTML = "";
    for (var i = 0; i < arrayList.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = arrayList[i].name;
        list.appendChild(newLi);
        (function(value){
        newLi.addEventListener("click", function(e) {
            print(value.data);
            arrayList.splice(arrayList.indexOf(value), 1);
            e.target.remove();
        }, false);})(arrayList[i]);
    }
};
