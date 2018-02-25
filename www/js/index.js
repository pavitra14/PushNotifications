var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $('.loading').css('display', 'none');
        $('.ready').css('display', 'block');
        $('.title').html('Jab tak suraj chand rhega, Singlehood ka naam rhega');
        //The code for push notifications goes below
        var push = PushNotification.init({ "android": {"senderID": "971877144509"}});
        push.on('registration', function(data) {
        //alert(data.registrationId);
        //Send a ajax request to our api to store the registrationIds
        var url = "http://prod.pbehre.in/api/fcm.php"; // the script where you handle the reg input.
        $.ajax({
               type: "GET",
               url: url,
               data: "reg=" + data.registrationId, // serializes the form's elements.
               success: function(data)
               {
                   alert(data); // show response from the php script.
               }
             });

        });

        push.on('notification', function(data) {
        alert(data.title+" Message: " +data.message);
        });

        push.on('error', function(e) {
        alert(e);
        });

        console.log('Received Event: ' + id);
    }
};
