function getRemote(label) {
    return $.ajax({
        type: "GET",
        url: label,
        async: false
    }).responseText;
}


function formReady(){
	console.log('form ready');
	var src_url = JFCustomWidget.getWidgetSetting('sourceURL');
    console.log(src_url);
    var src_text = document.getElementById('userInput').value = src_url;
    
    var response = getRemote(src_url);
    console.log('response', response);
    
    var data = JSON.parse(response);
    console.log('-> data -> ', data);
    $(function() {
        $.each(data, function(i, option) {
            console.log('option', option);
            $('#dd').append($('<option/>').attr("value", option).text(option));
        });
    })
    $("#dd").change(function () {
        var obj = {value: this.value}
        var end = this.value;
        console.log('end', end);
        JFCustomWidget.sendData(obj);
    });
    console.log('$("#dd").value', $("#dd").value);
    //subscribe to form submit event
    JFCustomWidget.subscribe("submit", function() {
        var msg = {
                //you should valid attribute to data for JotForm
                //to be able to use youw widget as required
                valid: true,
                //value: document.getElementById('dd').value
                value: 'osman'
                //value: $("#dd").value
            }
            // send value to JotForm
        debugger;
        JFCustomWidget.sendSubmit(msg);
    });
}

function init(){
	JFCustomWidget.subscribe("ready",formReady);
}

window.onload = init;