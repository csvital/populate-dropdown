// Constants
const BASE_ID = "jfDropdown-custom";

function formReady(){
    
    console.log('form ready');
    var src_url = JFCustomWidget.getWidgetSetting('sourceURL');
    console.log(src_url);

    // get the json file from external source
    $.ajax({
        url: src_url,
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        }
    }).done(function( response ) {
        if ( console && console.log ) {
            console.log('response', response);
            var data = JSON.parse(response);
            console.log('-> data -> ', data);
            $(function() {
                $.each(data, function(i, option) {
                    console.log('->  i : ', i);
                    console.log('-> option : ', option.level1);
                    $('#'+BASE_ID).append($('<option/>').attr("value", option.level1).text(option.level1));    
                });
            })            
        }
    });

    $("#jfDropdown-custom").change(function () {
        var obj = {value: this.value}
        var end = this.value;
        console.log('end', end);
        JFCustomWidget.sendData(obj);
    });
    
    //subscribe to form submit event
    JFCustomWidget.subscribe("submit", function() {
        var msg = {
                //you should valid attribute to data for JotForm
                //to be able to use youw widget as required
                valid: true,
                value: $("#jfDropdown-custom").value
            }
            // send value to JotForm
        JFCustomWidget.sendSubmit(msg);
    });
}

function init(){
    JFCustomWidget.subscribe("ready",formReady);
}

window.onload = init;


/*

var dropdown = $('<select />');
dropdown.attr("id", "jfDropdown-custom2");
console.log('->option', option.level2);
$.each(option.level2, function(i,opt) {
console.log('--> i', i);
console.log('opt', opt);
$('#jfDropdown-custom2').append($('<option/>').attr("value", opt).text(opt));    
});
//$('#jfDropdown-custom').append($('<option/>').attr("value", option).text(option));    
dropdown.appendTo('body');

*/