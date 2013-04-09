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

        // initialize the eventing
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

        var earthExtensions = new UNIVERSE.EarthExtensions(universe, false);

        earthExtensions.addEarth("assets/img/world3000.jpg", "assets/img/earth_lights_lrg-dim.png")

        earthExtensions.addMoon("assets/img/moon_1024.jpg")

        earthExtensions.addSun();

        // var initialPosition = new UNIVERSE.ECICoordinates(
        //            -14213.99162,
        //            -39987.86471,
        //            -1115.314875,
        //            2.865601523,
        //            -1.007157587,
        //            -0.410247122
        //        );
        // 
        //        var date = new Date();
        //        var epoch = new Date(date);
        // 
        //        universe.addJsonGeometryModel("dsp", "assets/models/DSP.json", function() {
        //            var spaceObject = new UNIVERSE.SpaceObject(
        //                "space_object_id",
        //                "space_object_name",
        //                "dsp",
        //                function(time, updateState) {
        //                    time = new Date(universe.getCurrentUniverseTime());
        //                    var elapsedTime = time - epoch;
        //                    dt = 100;
        //                    var location = OrbitPropagator.propagateOrbit(initialPosition, elapsedTime/1000, dt, epoch);
        //                    //console.log(JSON.stringify(location));
        //                    return location;
        //                },
        //                true,
        //                true,
        //                [],
        //                initialPosition,
        //                universe,
        //                earthExtensions
        //            );
        //            spaceObject.showVehicle = true;
        // 
        //            earthExtensions.addSpaceObject(spaceObject, function() {earthExtensions.showAllOrbitLines(true)});
        // 
        //        });


//        var groundObject = new UNIVERSE.GroundObject("blue_dot", "blue_dot", null, function() {
//            return CoordinateConversionTools.convertLLAtoECI(
//                new UNIVERSE.LLACoordinates(40, -104, 1),
//                CoordinateConversionTools.convertTimeToGMST(universe.getCurrentUniverseTime())
//            );
//        })
//        earthExtensions.addGroundDot(groundObject, 0x0000FF, 500, function () {});
//
//        var groundObject2 = new UNIVERSE.GroundObject("green_dot", "green_dot", null, function() {
//            return CoordinateConversionTools.convertLLAtoECI(
//                new UNIVERSE.LLACoordinates(50, -95, 1),
//                CoordinateConversionTools.convertTimeToGMST(universe.getCurrentUniverseTime())
//            );
//        })
//
//        earthExtensions.addGroundDot(groundObject2, 0x00FF00, 300, function () {});
//
//        earthExtensions.addStaticGroundDot("static_object", "name", 0xFF0000, 400, 45, 15, 1000, function () {});

        // universe.play(date, 5000, function(state) {
        //             $("#current-time").text(state.currentUniverseTime);
        //          });
        
        // document.getElementById("universe").getElementsByTagName("canvas")[0].style.position="";

        // owfdojo.config.dojoBlankHtmlUrl = '../assets/js/blank.html';

        // OWF.Preferences.getUserPreference({
        //             namespace:'com.solidyn.universe',
        //             name:'showTime',
        //             onSuccess: function(prefValue) {
        //                 if(prefValue.value === "true") {
        //                     $("#universe-time").show();
        //                 } else {
        //                     $("#universe-time").hide();
        //                 }
        //                 $("#show-time-checkbox").attr("checked", prefValue.value === "true" ? true : false);
        //             },
        //             onFailure: function (error, status) {
        //                 $("#universe-time").show();
        //                 $("#show-time-checkbox").attr("checked", true);
        //             }
        //         });
        // 
        //         $("#show-time-checkbox").change(function() {
        //             var checkbox = $(this);
        //             OWF.Preferences.setUserPreference({
        //                 namespace:'com.solidyn.universe',
        //                 name:'showTime',
        //                 value: checkbox.is(":checked").toString(),
        //                 onSuccess: function() {
        //                     if(checkbox.is(":checked")) {
        //                         $("#universe-time").show();
        //                     } else {
        //                         $("#universe-time").hide();
        //                     }
        //                 },
        //                 onFailure: function(error, status) {
        //                     $(this).attr("checked", !$(this).is(":checked"));
        //                 }
        //             });
        //         });

        function updateTime(date) {
            console.log('updating date to: ' + date);
            universe.setCurrentUniverseTime(date);
        };

        // This is receiving an Event, i.e. a broadcast message on the universe-commands channel
        OWF.Eventing.subscribe("universe-commands", function(sender, msg) {
            logger.info("received command: " + msg + " from " + JSON.stringify(sender));
            if (msg === "pause") {
                universe.pause();
            } else if (msg === "play") {
                universe.play();
            }

        });

        // Registering the function is necessary to make use of the OWF RPC widget proxies
        // This is making the updateTime method available as an RPC method
        OWF.RPC.registerFunctions([
            {
                name: 'updateTime',
                fn: updateTime
            }
        ]);

        // Sets up the Intent to receive the time from an Intent sender
        // This must also be defined in the descriptor html
        OWF.Intents.receive(
            {
                action: 'time',
                dataType: 'application/vnd.owf.universe.command'
            },
            function (sender, intent, data) {
                console.log("received data: " + JSON.stringify(data));
                updateTime(data.dateTime);
            }
        );

        var dragging = false;

        OWF.DragAndDrop.onDragStart(function() {
            dragging = true;
            $("#universe").addClass("ddOver");
        });

        OWF.DragAndDrop.onDragStop(function() {
            dragging = false;
            $("#universe").removeClass("ddOver");
        });

        OWF.DragAndDrop.onDrop(function(msg) {
            console.log("dropped point: " + JSON.stringify(msg.dragDropData));
            var name = msg.dragDropData.name,
                lat = msg.dragDropData.lat,
                lon = msg.dragDropData.lon;

            earthExtensions.addStaticGroundDot(name, name, 0x07B807, 300, lat, lon, 100, function() {});
        }, this);

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

        // OWF.Chrome.insertHeaderButtons({
        //     items:[
        //         {
        //             type: 'gear',
        //             itemId:'gear',
        //             handler: function(sender, data) {
        //                 alert('Utility Button Pressed');
        //             }
        //         }
        //     ]
        // });

//        OWF.Chrome.insertHeaderMenus({
//            items:[
//                {
//                    itemId:'menu1',
//                    icon: './themes/common/images/skin/exclamation.png', text: 'Menu 1',
//                    menu: {
//                        items: [
//                            {
//                                itemId:'menu1_menuItem1',
//                                icon: './themes/common/images/skin/exclamation.png', text: 'Menu Item 1',
//                                handler: function(sender, data) {
//                                    alert('You clicked Menu Item 1 from Menu 1.');
//                                }
//                            }
//                        ]
//                    }
//                }
//            ]
//        });

//        OWF.Chrome.getTitle({
//            callback: function(msg) {
//                //msg will always be a json string
//                var res = JSON.parse(msg);
//                if (res.success) {
//                    alert("The title of this widget is: " + res.title);
//                }
//            }
//        });

//        OWF.Chrome.setTitle({
//            title: "A cool new title",
//            callback: function (msg) {
//                //msg will always be a json string
//                var res = JSON.parse(msg);
//                if (res.success) {
//                    alert("The title was changed!")
//                }
//            }
//        });

        OWF.notifyWidgetReady();
    });
});
