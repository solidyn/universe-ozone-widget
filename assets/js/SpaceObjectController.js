var UNIVERSEWIDGET = UNIVERSEWIDGET || {};

UNIVERSEWIDGET.SpaceObjectController = function (universe, earthExtensions) {
	var pointCounter = 0;
	function addSpaceObject(name, color, size, x, y, z, vx, vy, vz, epoch, callback) {
		color = color || 0x07B807;
		size = size || 1000;
		name = name || pointCounter + 1;
		earthExtensions.addDefaultSpaceObject(name, name, color, size, x, y, z, vx, vy, vz, epoch, callback);
		pointCounter += 1;
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
	};
	
	initialize();
	return this;
};