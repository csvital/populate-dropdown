$(function(){ // widget management block
  JFCustomWidget.subscribe("ready",function(){
    // parameters from user
    var jsonSource = JFCustomWidget.getWidgetSetting('jsonSource'); // required
    var withId = JFCustomWidget.getWidgetSetting('withId'); // if true dd will populate with ID's
    var key = JFCustomWidget.getWidgetSetting('keyVal'); // if true dd will populate with ID's
    console.log('jsonSource', jsonSource);
    console.log('withId', withId);
    console.log('key', key);

    // get the json file from external source
    $.ajax({
      url: jsonSource
      //beforeSend: function( xhr ) { // error fix
      //  xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
      //}
    }).success(function( data ) { // success -> done
      console.log('response', data);

      var c = typeof data;
      console.log('datatype', c);
      console.log('data.length', data.length);


      if(data.length === undefined){
        // burasi single object type
        console.log('single object');

        $(function() {
          var options = ""; // for less DOM manipulations, firstly create string and put it on this.

          if(withId === "true"){

            console.log('true');
            
            $.each(data, function(i, option) {
              //console.log('->  i : ', i);
              //console.log('-> option : ', option);          
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option).text(i + " " + option));      
              options = options.concat('<option value"'+option+'">'+i+" " +option+'</option>');
            });  

            var start = new Date();
            $('#jfDropdown-custom').append(options);      
            console.log('new Date() - start', new Date() - start);
          }else {

            console.log('false');

            
            $.each(data, function(i, option) {
              //console.log('->  i : ', i);
              //console.log('-> option : ', option);          
              
              // ready  
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option[key]).text(option[key]));      


              // stress test fix try
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option).text(option));      
              options = options.concat('<option value"'+option+'">'+option+'</option>');
            });
              //console.log('options', options);

              var start = new Date();
              $('#jfDropdown-custom').append(options);      
              console.log('new Date() - start', new Date() - start);
          }
        })
        

      }else{
        // burası object array type
        console.log('object array type');

        $(function() {
          var options = ""; // for less DOM manipulations, firstly create string and put it on this.

          if(withId === "true"){

            console.log('true');
            
            $.each(data, function(i, option) {
              //console.log('->  i : ', i);
              //console.log('-> option : ', option);          
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option[key]).text(i + " " + option[key]));      
              options = options.concat('<option value"'+option[key]+'">'+i+" "+option[key]+'</option>');
            });  

            var start = new Date();
            $('#jfDropdown-custom').append(options);      
            console.log('new Date() - start', new Date() - start);

          }else {

            console.log('false');

            
            $.each(data, function(i, option) {
              //console.log('->  i : ', i);
              //console.log('-> option : ', option);          
              
              // ready  
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option[key]).text(option[key]));      


              // stress test fix try
              //$('#jfDropdown-custom').append($('<option/>').attr("value", option).text(option));      
              options = options.concat('<option value"'+option[key]+'">'+option[key]+'</option>');
            });
              //console.log('options', options);

              var start = new Date();
              $('#jfDropdown-custom').append(options);      
              console.log('new Date() - start', new Date() - start);
          }
        })




      }

      //var data = JSON.parse(JSON.stringify(response)); // XHR yoksa bu 
      //var data = JSON.parse(response);                 // varsa bu 
      //window.realData = data;
      //console.log(data.length);
      //data = data.slice(0, 1);
      //console.log('-> data -> ', data);


    });
  });
});

// When submitter changed the selection 
// send a message to form, for conditions etc.
$(function() {
  $("#jfDropdown-custom").change(function () {
    JFCustomWidget.sendData({value: this.value});
  });
});

// ?? ??
$(function(){
  JFCustomWidget.subscribe("submit", function() {
    var msg = {
      valid: true,
      value: $("#jfDropdown-custom").value
    }
    JFCustomWidget.sendSubmit(msg);
  });
});
  