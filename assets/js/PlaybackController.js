
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.PlaybackController = function(universe) {

    // Initialize the playback controller
    function initialize() {
        subscribeForEvents();
        registerForIntents();
    }

    // Subscribe with the OWF framework for play/pause broadcast events
    function subscribeForEvents() {
        // This is receiving an Event, i.e. a broadcast message on the universe-commands channel
        // The message broadcast is expected to be a 2-element array of the intent data
        OWF.Eventing.subscribe("com.solidyn.universe-commands", function(sender, msg) {
			if(!$.isArray(msg)) {
				return;
			}
            if (msg[0].action === "play") {
                universe.play(undefined, msg[1].playbackSpeed);
            } else if (msg[0].action === "pause") {
                universe.pause();
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
                universe.play(undefined, data.playbackSpeed);
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

    initialize();
    return this;
}