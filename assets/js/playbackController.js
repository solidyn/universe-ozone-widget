
var OWF = OWF || {};

UNIVERSEWIDGET.playbackController = function(universe, earthExtensions) {

    // Initialize the playback controller
    function initialize() {
        subscribeForEvents();
        registerForIntents();
    }

    // Subscribe with the OWF framework for play/pause broadcast events
    function subscribeForEvents() {
        // This is receiving an Event, i.e. a broadcast message on the universe-commands channel
        OWF.Eventing.subscribe("com.solidyn.universe-commands", function(sender, msg) {
            if (msg === "pause") {
                universe.pause();
            } else if (msg === "play") {
                universe.play();
            }
        });
    }

    // Unsubscribe with the OWF framework for play/pause broadcast events
    function unsubscribeForEvents() {
        OWF.Eventing.unsubscribe("com.solidyn.universe-commands");
    }

    // Register with the OWF framework as a receiver for playback intents.
    function registerForIntents() {
        OWF.Intents.receive(
            {
                action: 'play',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                universe.play();
            }
        );

        OWF.Intents.receive(
            {
                action: 'pause',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                universe.pause();
            }
        );
    }
}