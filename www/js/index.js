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
        var myToken = localStorage.getItem("token");
        if(myToken !== "" && myToken !== null){
            console.log(myToken);
            $('.ready').html("Device already registered, Godspeed!");
            alert(myToken);
            //window.open('http://prod.pbehre.in/api/fcm.php?reg=' + data.registrationId, "_system"); //this link is only for the debug
        } else {
        if (confirm("Do you want to register this device to recieve notifications? If yes, please follow the onscreen instructions and send a whatsapp message.")) {
            window.plugins.socialsharing.shareViaWhatsAppToPhone('+919424995580', data.registrationId, null /* img */, null /* url */, function() {console.log('share ok')});
            localStorage.setItem("token", data.registrationId);
            $('.ready').html("Device successfully registered, Godspeed!");
        } else {
            navigator.app.exitApp();
        }
    }
        });

        push.on('notification', function(data) {
            console.log(data.message);
        alert(data.title+" Quote: " +data.message);
        });

        push.on('error', function(e) {
        alert(e);
        });

        console.log('Received Event: ' + id);
    }
};
