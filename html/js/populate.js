$(function(){ // widget management block
  JFCustomWidget.subscribe("ready",function(){
    // parameters from user
    var jsonSource = JFCustomWidget.getWidgetSetting('jsonSource'); // required    
    
    console.log('jsonSource', jsonSource);
    

    console.log('start');
    var jqxhr = $.getJSON( jsonSource, function() {
      console.log( "success" );

    }).done(function() {
        console.log( "second success" );
        console.log('jqxhr', jqxhr);
        console.log( jqxhr.responseJSON ); // Logs "jQuery Howto"

        var options = [];
        $.each(jqxhr.responseJSON, function(i, option) {
          console.log('option val ->', option.val);
          if(option.val === undefined){return true;} // bos obje ise gec
          options.push($('<option />').val(option.val).text(option.val));
        });
        
        // Timer 
        var start = new Date();
        $('#jfDropdown-custom').append(options);      
        console.log('elapsed time for dom', new Date() - start);

      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      })
      .always(function() {
        console.log( "complete" );
      });
 
    // Perform other work here ...
     
    // Set another completion function for the request above
    jqxhr.complete(function() {
      console.log(jqxhr);
      console.log( "second complete" );
    });
    console.log('end');


 
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
  