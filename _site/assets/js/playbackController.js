
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.PlaybackController = function(universe, functionMap) {

    // Initialize the playback controller
    function initialize() {
        subscribeForEvents();
        registerForIntents();
    }

    // Subscribe with the OWF framework for play/pause broadcast events
    function subscribeForEvents() {
        functionMap['play'] = playUniverse;
        functionMap['pause'] = pauseUniverse;
        functionMap['setTime'] = setUniverseTime;
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