
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.PlaybackController = function(universe) {

    // Initialize the playback controller
    function initialize() {
        subscribeForEvents();
        registerForIntents();
    }

    var functionMap = {};
    functionMap['play'] = playUniverse;
    functionMap['pause'] = pauseUniverse;
    functionMap['setTime'] = setUniverseTime;


    // Subscribe with the OWF framework for play/pause broadcast events
    function subscribeForEvents() {
        // This is receiving an Event, i.e. a broadcast message on the universe-commands channel
        // The message broadcast is expected to be a 2-element array of the intent data
        OWF.Eventing.subscribe("com.solidyn.universe-commands", function(sender, msg) {
			if(!$.isArray(msg)) {
				return;
			}

            var method = functionMap[msg[0].action];

            if (method) {
                method(msg[1]);
            } else {
                console.log("Action: "+msg[0].action+" not mapped!");
            }
        });
    }

    // Register with the OWF framework as a receiver for playback intents.
    function registerForIntents() {
        OWF.Intents.receive(
            {
                action: 'play',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                playUniverse(data);
            }
        );

        OWF.Intents.receive(
            {
                action: 'pause',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                pauseUniverse();
            }
        );

        OWF.Intents.receive(
            {
                action: 'setTime',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                setUniverseTime(data);
            }
        );
    }

    function playUniverse(data) {
        universe.play(undefined, data.playbackSpeed);
    }

    function pauseUniverse() {
        universe.pause();
    }

    function setUniverseTime(data) {
        universe.setCurrentUniverseTime(data.time);
    }

    initialize();
    return this;
}