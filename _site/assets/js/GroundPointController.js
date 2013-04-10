var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.GroundPointController = function (universe, earthExtensions) {
	var earthExtensions = earthExtensions,
	    pointCounter;
	
	function addGroundPoint(name, color, size, lat, lon, alt, callback) {
		earthExtensions.addStaticGroundDot(name, name, color, size, lat, lon, alt, callback);
		pointCounter += 1;
	};
	
	function removeGroundPoint(id) {
		universe.removeObject(id);
	}
	
	function initialize() {
		OWF.Intents.receive(
            {
                action: 'add',
                dataType: 'application/vnd.owf.latlonalt'
            },
            function (sender, intent, data) {
                console.log("received data: " + JSON.stringify(data));
				var color = data.color || 0x07B807,
				    size = data.size || 300,
					alt = data.alt || 0,
					name = data.name || pointCounter + 1;
				addGroundPoint(name, color, size, data.lat, data.lon, alt, function() {});
            }
        );

		OWF.Intents.receive(
            {
                action: 'remove',
                dataType: 'application/com.solidyn.universe.objectid'
            },
            function (sender, intent, data) {
                console.log("received data: " + JSON.stringify(data));
				removeGroundPoint(data.name);
            }
        );

        // Sets up the Intent to receive the time from an Intent sender
        // This must also be defined in the descriptor html

        // var dragging = false;
        // 
        //         OWF.DragAndDrop.onDragStart(function() {
        //             dragging = true;
        //             $("#universe").addClass("ddOver");
        //         });
        // 
        //         OWF.DragAndDrop.onDragStop(function() {
        //             dragging = false;
        //             $("#universe").removeClass("ddOver");
        //         });
        // 
        //         OWF.DragAndDrop.onDrop(function(msg) {
        //             console.log("dropped point: " + JSON.stringify(msg.dragDropData));
        //             var name = msg.dragDropData.name,
        //                 lat = msg.dragDropData.lat,
        //                 lon = msg.dragDropData.lon;
        // 				alt = msg.dragDropData.alt || 0;
        // 
        //             earthExtensions.addStaticGroundDot(name, name, 0x07B807, 300, lat, lon, alt, function() {});
        //         }, this);
        // 
        //         $("#universe").mouseout(function(e) {
        //             if (dragging) {
        //                 OWF.DragAndDrop.setDropEnabled(false);
        //             }
        //         });
        // 
        //         $("#universe").mouseover(function(e) {
        //             if (dragging) {
        //                 OWF.DragAndDrop.setDropEnabled(true);
        //             }
        //         });
	}
	
	initialize();
	return this;
}