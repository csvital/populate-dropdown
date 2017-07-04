$(function(){ // widget management block
  JFCustomWidget.subscribe("ready",function(){
    var jsonSource = JFCustomWidget.getWidgetSetting('jsonSource'); // required    
    var defaultOption = JFCustomWidget.getWidgetSetting('defaultOption');

    console.log('helloworld');

    // if user gave the parameter about default selection
    if(defaultOption !== undefined || defaultOption != null){
      var option = $('<option></option>').attr("value", defaultOption).text(defaultOption);
      $('#jfDropdown-custom').empty().append(option);  
    }
    
    var jqxhr = $.getJSON( jsonSource, function() {
      console.log( "success" );
    }).done(function() {
        var options = [];
        $.each(jqxhr.responseJSON, function(i, option) {
          // array of string OR array of objects
          // if option.name = undefined its array of string
          var toAdd = (option.name === undefined ? option : option.name);

          // toAdd may object if no name attr, so just ignore it
          if(typeof toAdd !== 'string'){return true;}

          // create element and push to array
          options.push($('<option />').val(toAdd).text(toAdd));
        });

        // manipulate the dom
        $('#jfDropdown-custom').append(options);      
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log('Something wrong!');
        console.log( "Request Failed: " + err );
      })
  });
});

// When submitter changed the selection 
// send a message to form, for conditions etc.
$(function() {
  $("#jfDropdown-custom").change(function () {
    JFCustomWidget.sendData({value: this.value});
  });
});

// Subscription for submit -> already send message
$(function(){
  JFCustomWidget.subscribe("submit", function() {
    var msg = {
      valid: true,
      value: $("#jfDropdown-custom").value
    }
    JFCustomWidget.sendSubmit(msg);
  });
});
  