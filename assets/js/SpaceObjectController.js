
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.SpaceObjectController = function (universe, earthExtensions, functionMap) {
	var pointCounter = 0;
	var spaceObjects = [];
	
	function addSpaceObjectCallback(msg) {
        addSpaceObject(msg.name, msg.color, msg.size, msg.x, msg.y, msg.z, msg.vx, msg.vy, msg.vz, Date.parse(msg.epoch), function(){});
    }
	
	function addSpaceObject(name, color, size, x, y, z, vx, vy, vz, epoch, callback) {
		color = color || 0x07B807;
		size = size || 1000;
		name = name || "space_" + pointCounter + 1;
		var spaceObject = earthExtensions.addDefaultSpaceObject(name, name, color, size, x, y, z, vx, vy, vz, epoch, callback);
		pointCounter += 1;
		spaceObjects[name] = spaceObject;
	}
	
	function removeSpaceObjectCallback(msg) {
        removeSpaceObject(msg.name);
    }
	
	function removeSpaceObject(id) {
		universe.removeObject(id);
		delete spaceObjects[name];
	};
	
	function addPropagationLineCallback(msg) {
		addPropagationLine(msg.name);
	}
	
	function addPropagationLine(id) {
		var object = spaceObjects[id];
		earthExtensions.addPropogationLineForObject(object, function() {
			earthExtensions.showOrbitLineForObject(true, id);
		});	
	}
	
	function removePropagationLineCallback(msg) {
		removePropagationLine(msg.name);
	}
	
	function removePropagationLine(id) {
		earthExtensions.showOrbitLineForObject(false, id);
	}
	
	function addSensorCallback(msg) {
		if (msg.sensorType === "ellipse") {
			addEllipseSensor(msg.name, msg.object, msg.semiMajor, msg.semiMinor, msg.alongTrack, msg.crossTrack, msg.radial);
		} else if (msg.sensorType === "rectangle") {
			addRectangleSensor(msg.name, msg.object, msg.height, msg.width, msg.alongTrack, msg.crossTrack, msg.radial);
		}
	}
	
	function addEllipseSensor(name, object, semiMajor, semiMinor, alongTrack, crossTrack, radial) {
		var shape = new UNIVERSE.EllipseSensorShape(name, semiMajor, semiMinor);
		var sensor = new UNIVERSE.Sensor(name, shape);
		sensor.rotateSensorAboutAlongTrackVector(alongTrack);
		sensor.rotateSensorAboutCrossTrackVector(crossTrack);
		sensor.rotateSensorAboutRadialVector(radial);
		earthExtensions.addSensorFootprintProjection(sensor, spaceObjects[object]);
		earthExtensions.showSensorFootprintProjectionsForId(true, object);
		earthExtensions.showAllSensorFootprintProjections(true);
	}
	
	function addRectangleSensor(name, object, height, width, alongTrack, crossTrack, radial) {
		var shape = new UNIVERSE.RectangleSensorShape(name, width, height);
		var sensor = new UNIVERSE.Sensor(name, shape);
		sensor.rotateSensorAboutAlongTrackVector(alongTrack);
		sensor.rotateSensorAboutCrossTrackVector(crossTrack);
		sensor.rotateSensorAboutRadialVector(radial);
		earthExtensions.addSensorFootprintProjection(sensor, spaceObjects[object]);
		earthExtensions.showSensorFootprintProjectionsForId(true, object);	
		earthExtensions.showAllSensorFootprintProjections(true);
	}
	
	function removeSensorCallback(msg) {
		universe.removeObject(msg.object + "_footprint_" + msg.name);
	}
	
	function initialize() {
		OWF.Intents.receive(
            {
                action: 'add',
                dataType: 'application/vnd.owf.universe.spaceobject'
            },
            function (sender, intent, data) {
                console.log("received data: " + JSON.stringify(data));
				addSpaceObject(data.name, data.color, data.size, data.x, data.y, data.z, data.vx, data.vy, data.vz, Date.parse(data.epoch), function() {});
            }
        );

		OWF.Intents.receive(
            {
                action: 'addPropagationLine',
                dataType: 'application/vnd.owf.universe.objectid'
            },
            function (sender, intent, data) {
				addPropagationLineCallback(data);
            }
        );

		OWF.Intents.receive(
            {
                action: 'removePropagationLine',
                dataType: 'application/vnd.owf.universe.objectid'
            },
            function (sender, intent, data) {
				removePropagationLineCallback(data);
            }
        );

		OWF.Intents.receive(
            {
                action: 'add',
                dataType: 'application/vnd.owf.universe.sensor'
            },
            function (sender, intent, data) {
				addSensorCallback(data);
            }
        );

		OWF.Intents.receive(
            {
                action: 'remove',
                dataType: 'application/vnd.owf.universe.sensor'
            },
            function (sender, intent, data) {
				removeSensorCallback(data);
            }
        );

		functionMap['addSpaceObject'] = addSpaceObjectCallback;
        functionMap['removeSpaceObject'] = removeSpaceObjectCallback;
        functionMap['addPropagationLine'] = addPropagationLineCallback;
        functionMap['removePropagationLine'] = removePropagationLineCallback;
		functionMap['addSensor'] = addSensorCallback;
		functionMap['removeSensor'] = removeSensorCallback;

		OWF.DragAndDrop.onDrop(function(msg) {
			if(msg.dragDropData.dataType === "application/vnd.owf.universe.spaceobject") {
				console.log("dropped space object: " + JSON.stringify(msg.dragDropData));
				addSpaceObject(msg.dragDropData.name,
							   msg.dragDropData.color,
							   msg.dragDropData.size,
							   msg.dragDropData.x,
							   msg.dragDropData.y,
							   msg.dragDropData.z,
							   msg.dragDropData.vx,
							   msg.dragDropData.vy,
							   msg.dragDropData.vz,
							   Date.parse(msg.dragDropData.epoch),
							   function () {}
				);
			}
        }, this);
	};
	
	
	initialize();
	return this;
};