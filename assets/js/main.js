var OWF = OWF || null;
if (OWF === null) {
	$("body").append("<h1>This widget must be run within the Ozone Widget Framework to be useful</h1>");
}
//The location is assumed to be at /<context>/js/eventing/rpc_relay.uncompressed.html if it is not set
//OWF.relayFile = '/assets/js/eventing/rpc_relay.uncompressed.html';
OWF.ready(function() {
    $(document).ready(function() {
        var logger = OWF.Log.getDefaultLogger();

        OWF.Log.setEnabled(true);
        var appender = logger.getEffectiveAppenders()[0];
        appender.setThreshold(log4javascript.Level.INFO);

        // initialize the eventing for widget state
        var eventMonitor = {};
        eventMonitor.widgetEventingController = Ozone.eventing.Widget.getInstance();

        eventMonitor.widgetState = Ozone.state.WidgetState.getInstance({
            widgetEventingController: eventMonitor.widgetEventingController,
            autoInit: true,
            onStateEventReceived: function(sender, msg) {
                console.log("Received state event "+JSON.stringify(msg)+" from "+sender)

                switch(msg.eventName) {
                    case "resize":
                        console.log("Received resize event")
                        var currentState = eventMonitor.widgetState.getWidgetState({
                            callback: function(state) {
                                $(window).resize()
                            }
                        })
                        break;
                    case "dragend":
                        console.log("Received dragend event")
                        break;
                    case "close":
                        console.log("Received close event")
                        break;
                    default:
                        alert("Bad message received!")
                }
            }
        });

        eventMonitor.widgetState.addStateEventListeners({
            events: ["resize","dragend","close"],
            callback: function() {
                console.log("Registration completed")
            }
        });

        var universe = new UNIVERSE.Universe(new Date(), 30, document.getElementById("universe"));
        universe.setPlaybackSpeed(500);

        var earthExtensions = new UNIVERSE.EarthExtensions(universe, false);

        earthExtensions.addEarth("assets/img/world3000.jpg", "assets/img/earth_lights_lrg-dim.png")

        earthExtensions.addMoon("assets/img/moon_1024.jpg")

        earthExtensions.addSun();

		document.getElementById("universe").getElementsByTagName("canvas")[0].style.position="";

        var functionMap = {};
		var groundPointController = UNIVERSEWIDGET.GroundPointController(universe, earthExtensions, functionMap);
        var playbackController = UNIVERSEWIDGET.PlaybackController(universe, functionMap);

        // This is receiving an Event, i.e. a broadcast message on the universe-commands channel
        // The message broadcast is expected to be a 2-element array of the intent data
        OWF.Eventing.subscribe("com.solidyn.universe-commands", function(sender, msg) {

            var method = functionMap[msg.action];

            if (method) {
                method(msg);
            } else {
                console.log("Action: "+msg.action+" not mapped!");
            }
        });

         // owfdojo.config.dojoBlankHtmlUrl = '../assets/js/blank.html';

		// Global drag and drop support

        var dragging = false;

		OWF.DragAndDrop.onDragStart(function() {
		    dragging = true;
		    $("#universe").addClass("ddOver");
		});

		OWF.DragAndDrop.onDragStop(function() {
		    dragging = false;
		    $("#universe").removeClass("ddOver");
		});

		$("#universe").mouseout(function(e) {
            if (dragging) {
                OWF.DragAndDrop.setDropEnabled(false);
            }
        });

        $("#universe").mouseover(function(e) {
            if (dragging) {
                OWF.DragAndDrop.setDropEnabled(true);
            }
        });

        OWF.notifyWidgetReady();
    });
});
