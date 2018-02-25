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
            console.log('registration triggered');
            
        alert("Registration Successfull");      
        $('.r2').html(data.registrationId);
        });

        push.on('notification', function(data) {
            console.log(data.message);
        alert(data.title+" Message: " +data.message);
        });

        push.on('error', function(e) {
        alert(e);
        });

        console.log('Received Event: ' + id);
    }
};
