$(function(){ // widget management block
  JFCustomWidget.subscribe("ready",function(){
    var jsonSource = JFCustomWidget.getWidgetSetting('jsonSource'); // required    
    var defaultOption = JFCustomWidget.getWidgetSetting('defaultOption');
    var multiSelect = JFCustomWidget.getWidgetSetting('multiSelect') === 'true';
 
    // console.log('jsonSource', jsonSource);
    // console.log('defaultOption', defaultOption);
    // console.log('multiSelect', multiSelect);

    if(jsonSource === undefined){jsonSource = [];}

    // if false remove it
    if(!multiSelect){
      $('#jfDropdown-custom').removeAttr("multiple", "multiple");
    }

    // order boyle olmali bu burda durmali yoksa gec load oluyor sikinti
    $("#jfDropdown-custom").select2({
      placeholder: defaultOption,
      allowClear : true
    });  

    // if user gave the parameter about default selection 
    if (!multiSelect) {
      if (defaultOption !== undefined || defaultOption != null) {
        var option = $('<option></option>').attr("value", "").text(defaultOption);
        $('#jfDropdown-custom').empty().append(option);  
      } else {
        // if no default option print empty option
        var option = $('<option></option>').attr("value", "").text("");
        $('#jfDropdown-custom').empty().append(option);  
      }
    }

    // var jqXHR = null;

    // //Download progress
    //   jqxhr.addEventListener( "progress", function ( evt )
    //   {
    //       if ( evt.lengthComputable )
    //       {
    //           var percentComplete = Math.round( (evt.loaded * 100) / evt.total );
    //           //Do something with download progress
    //           console.log( 'Downloaded percent', percentComplete );
    //       }
    //   }, false );

    var jqxhr = $.getJSON( jsonSource, function(data) {
      // console.log( data );
      // $( "#progressbar" ).progressbar({
      //   value: data.progressbar
      // });
      // console.log('jqxhr', jqxhr);      
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
      .progress(function(e){
        // console.log('e', e);
        // console.log(e);
        if(e.lengthComputable) {
            //calculate the percentage loaded
            var pct = (e.loaded / e.total) * 100;
            //log percentage loaded
            // console.log(pct);
            //$('#progress').html(pct.toPrecision(3) + '%');
        }
      })
  });
});


// during open and close actions request frame size
$(function(){
  $('#jfDropdown-custom').on('select2:opening', function (evt) {
    // console.log('evt', evt);
    // console.log('aciliyom');
    
    data ={  
      "width": 400,
      "height": $(".content").height() + 275
    }

    JFCustomWidget.requestFrameResize(data);
  });
  $('#jfDropdown-custom').on('select2:closing', function (evt) {
    // console.log('evt', evt);
    // console.log('kapaniyom');
    
    data ={  
      "width": 400,
      "height": $(".content").height() + 30
    }

    JFCustomWidget.requestFrameResize(data);
  });
});



// When submitter changed the selection 
// send a message to form, for conditions etc.
$(function() {
  
  $('#jfDropdown-custom').on('select2:select', function (evt) {
    // console.log('select changed');
    // console.log('evt.currentTarget.value', $("#jfDropdown-custom").val());
    JFCustomWidget.sendData({value: $("#jfDropdown-custom").val()});
    
  });

  $('#jfDropdown-custom').on('select2:unselect', function (evt) {
    // console.log('select changed');
    // console.log('evt.currentTarget.value', $("#jfDropdown-custom").val());
    JFCustomWidget.sendData({value: $("#jfDropdown-custom").val()});
    
  });

  // $('#jfDropdown-custom').change(function () {
  //   JFCustomWidget.sendData({value: this.value});
  // });
});

// Subscription for submit -> already send message
$(function(){
  JFCustomWidget.subscribe("submit", function() {

    var result = "";
    //TODO control null
    var temp = $("#jfDropdown-custom").val();
    // console.log('$("#jfDropdown-custom").val()', typeof temp);
    if(temp !== null && typeof temp === 'object'){
      // console.log('multiselect bu');
      result = $("#jfDropdown-custom").val().join('\n');  
    }else {
      // console.log('any other ');
      result = $("#jfDropdown-custom").val(); 
    }
    // if($("#jfDropdown-custom").val() != null || $("#jfDropdown-custom").val() !== 'string'){


    //   result = $("#jfDropdown-custom").val().join('\n');  
    // }

    var msg = {
      valid: true,
      value: result
    }
    JFCustomWidget.sendSubmit(msg);
  });
});



$(function(){  
  function showHeight( element, height ) {
    // console.log("The height for the " + element + " is " + height + "px.");
  }

  $('select').on('change', function (evt) {
    // console.log('yes');
    // console.log('evt', evt);
    showHeight( "dropdown", $(".select2-selection.select2-selection--multiple").height() );
    showHeight( "iframe", $(".content").height() );

    data ={  
      "width": 400,
      "height": $(".content").height() + 30
    }

    JFCustomWidget.requestFrameResize(data);
  });
});
  