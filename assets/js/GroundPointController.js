var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.GroundPointController = function (universe, earthExtensions, functionMap) {
	var earthExtensions = earthExtensions,
	    pointCounter;

    function addGroundPointCallback(msg) {
        addGroundPoint(msg.name, msg.color, msg.size, msg.lat, msg.lon, msg.alt, function(){});
    }

	function addGroundPoint(name, color, size, lat, lon, alt, callback) {
		color = color || 0x07B807;
		size = size || 300;
		alt = alt || 0;
		name = name || pointCounter + 1;
		earthExtensions.addStaticGroundDot(name, name, color, size, lat, lon, alt, callback);
		pointCounter += 1;
	}

    function removeGroundPointCallback(msg) {
        removeGroundPoint(msg.name);
    }
	
	function removeGroundPoint(id) {
		universe.removeObject(id);
	};
	
	function initialize() {
		OWF.Intents.receive(
            {
                action: 'add',
                dataType: 'application/vnd.owf.latlonalt'
            },
            function (sender, intent, data) {
                console.log("received data: " + JSON.stringify(data));
				addGroundPoint(data.name, data.color, data.size, data.lat, data.lon, data.alt, function() {});
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

        functionMap['add'] = addGroundPointCallback
        functionMap['remove'] = removeGroundPointCallback

        OWF.DragAndDrop.onDrop(function(msg) {
			if(msg.dragDropData.dataType === "application/vnd.owf.latlonalt") {
				console.log("dropped point: " + JSON.stringify(msg.dragDropData));
				addGroundPoint(msg.dragDropData.name,
							   msg.dragDropData.color,
							   msg.dragDropData.size,
							   msg.dragDropData.lat,
							   msg.dragDropData.lon,
							   msg.dragDropData.alt,
							   function () {}
				);
			}
        }, this);
	}
	
	initialize();
	return this;
}