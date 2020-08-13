(function(window, undefined){
    window.Asc.plugin.init = function() {
      getBalance();
    };
    window.Asc.plugin.button = function(id)
    {
        if (id == 0)
        {
            var MokeanKey =  localStorage.getItem("MokeanKey");
            var MokeanSecret = localStorage.getItem("MokeanSecret");

            var MOCEAN_API_BROADCAST_FROM = $('#MOCEAN_API_BROADCAST_FROM').val();
            var MOCEAN_API_BROADCAST_PHONES = $('#MOCEAN_API_BROADCAST_PHONES').val();
            var MOCEAN_API_BROADCAST_MESSAGE = $('#MOCEAN_API_BROADCAST_MESSAGE').val();
           if(MOCEAN_API_BROADCAST_FROM == '' || MOCEAN_API_BROADCAST_PHONES == '' || MOCEAN_API_BROADCAST_MESSAGE == '') {
               $('#displayError').html('All fields is required');
               $('#displayError').show();
               return ;
           } else {
                $('#displayError').hide();
               
                var xprogress;
                var phones_length;
                $('#progress_message').html('In the process of sending');
                $('#progress_message').show();
                $('.progress').show();
                xprogress =1;
                phones = $('[name=MOCEAN_API_BROADCAST_PHONES]').val().split(",");
                phones_length = phones.length;
                $.each(phones, function(index,value) {
                    sendMessage(MOCEAN_API_BROADCAST_FROM, value, MOCEAN_API_BROADCAST_MESSAGE, phones_length, xprogress);
                    xprogress++;
                });
           }
        } else {
            this.executeCommand("close", "");
        }
    };
    
    function sendMessage(from,phone,message, phones_length, xprogress) {
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        $.ajax({
            type:'POST',
            url:proxy+'https://rest.moceanapi.com/rest/2/sms',
            data: { 'mocean-api-key':MokeanKey, 'mocean-api-secret':MokeanSecret, 'mocean-from': from, 'mocean-to': phone, 'mocean-text': message}
        }).done(function(res) {
            console.log(phones_length);
            
            progress = (100 * xprogress) / phones_length;
            $('#loader').html(progress+'%');
            $('#loader').attr('style', 'width:'+progress+'%');
            if(progress == 100) {
                $('#progress_message').removeClass('alert-warning');
                $('#progress_message').addClass('alert-success');
                getBalance('Updating ...');
                if(phones_length > 1) {
                    $('#progress_message').html('The message has been sent to everyone');
                } else {
                    $('#progress_message').html('The message has been sent to phone number');
                }
                $('#send-to').find("input[type=text], textarea").val("");
                $('.progress').hide();
                 $('#configuration_form_submit_btn').removeAttr('disabled');
                 $('#loader').html(0+'%');
                 $('#loader').attr('style', 'width:'+0+'%');
            }
           
        })
    }
    
    function getBalance(ptext = null) {
       MokeanKey =  localStorage.getItem("MokeanKey");
       MokeanSecret = localStorage.getItem("MokeanSecret");
       var proxy = 'https://cors-anywhere.herokuapp.com/';
       if(ptext == null) {
         $('#balance').html('Authenticating...')
       } else {
            $('#balance').html(ptext);
       }
       $.ajax({
            type: 'GET',
            url: proxy+'https://rest.moceanapi.com/rest/2/account/balance',
            contentType: 'application/json',
            data: {'mocean-api-key':MokeanKey, 'mocean-api-secret':MokeanSecret, 'mocean-resp-format': 'JSON' }
       }).done(function(result){
           if(result.status > 1) {
               $('#balance').html('<font>API is not configured</font>')
           } else {
                $('#balance').html('Balance: '+result.value + " EUR")
           }
       }).fail(function(res){
           $('#balance').html('<font>Invalid API key and/or secret for SMS authentication.</font>')
       })
    }
    
})(window, undefined);