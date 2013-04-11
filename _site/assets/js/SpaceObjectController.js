
var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.SpaceObjectController = function (universe, earthExtensions, functionMap) {
	var pointCounter = 0;
	
	function addSpaceObjectCallback(msg) {
        addSpaceObject(msg.name, msg.color, msg.size, msg.x, msg.y, msg.z, msg.vx, msg.vy, msg.vz, Date.parse(msg.epoch), function(){});
    }
	
	function addSpaceObject(name, color, size, x, y, z, vx, vy, vz, epoch, callback) {
		color = color || 0x07B807;
		size = size || 1000;
		name = name || "space_" + pointCounter + 1;
		earthExtensions.addDefaultSpaceObject(name, name, color, size, x, y, z, vx, vy, vz, epoch, callback);
		pointCounter += 1;
	}
	
	function removeSpaceObjectCallback(msg) {
        removeSpaceObject(msg.name);
    }
	
	function removeSpaceObject(id) {
		universe.removeObject(id);
	};
	
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

		functionMap['addSpaceObject'] = addSpaceObjectCallback;
        functionMap['removeSpaceObject'] = removeSpaceObjectCallback;

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