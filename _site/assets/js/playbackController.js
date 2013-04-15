
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.PlaybackController = function(universe, earthExtensions, functionMap) {

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
        functionMap['setSunLighting'] = setSunLighting;
		functionMap['lockCamera'] = lockCamera;
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

        OWF.Intents.receive(
            {
                action: 'setSunLighting',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                setSunLighting(data);
            }
        );

        OWF.Intents.receive(
            {
                action: 'lockCamera',
                dataType: 'application/vnd.owf.universe.command'
            }, function (sender, intent, data) {
                lockCamera(data);
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

    function setSunLighting(data) {
        earthExtensions.setSunLighting(data.sunLightingState);
    }

	function lockCamera(data) {
		earthExtensions.lockCameraPositionRelativeToEarth(data.lockCameraState);
	}

    initialize();
    return this;
}