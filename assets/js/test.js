OWF.ready(function() {
	$(document).ready(function() {
		$("#add_ground_point").on("click", function() {
			var data = {
                lat: 40,
				lon: -104,
				alt: 5280,
				name: "boulder"
            };
			if ($("#eventRadio").is(':checked')) {
				data.action = "addPoint";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'add', dataType:'application/vnd.owf.latlonalt'
	                }, 
					data,
	                function (dest) {

	                }
	            );
			}
		});
		
		$("#remove_ground_point").on("click", function() {
			var data = {
				name: "boulder"
			};

			if ($("#eventRadio").is(':checked')) {
				data.action = "removePoint";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'remove', dataType:'application/com.solidyn.universe.objectid'
	                }, {
						name: "boulder"
	                },
	                function (dest) {

	                }
            	);
			}
		});

        $("#play").on("click", function() {
            var cmd = {
                    action:'play',
                    dataType:'application/vnd.owf.universe.command'
                };
            var data = {
                    playbackSpeed: $('#playbackSpeedInput').val()
                };

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", [cmd,data]);
            } else {
                OWF.Intents.startActivity(
                    cmd, data,
                    function (dest) {
                    }
                )
            }

        });

        $("#pause").on("click", function() {
            var cmd = {
                    action:'pause',
                    dataType:'application/vnd.owf.universe.command'
                };
            var data = {};

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", [cmd,data]);
            } else {
                OWF.Intents.startActivity(
                    cmd, data,
                    function (dest) {
                    }
                )
            }
        });

	    owfdojo.query(".point").connect('onmousedown', this, function(e) {
	        e.preventDefault();
	        var data = {
				dataType: "application/vnd.owf.latlonalt",
	            name: $(e.currentTarget).text(),
	            lat: $(e.currentTarget).attr("lat"),
	            lon: $(e.currentTarget).attr("lon")
	        };

	        OWF.DragAndDrop.startDrag({
	            dragDropLabel: data.name,
	            dragDropData: data
	        });
	    });

        $('#datetimepicker').datetimepicker({
            language: 'pt-BR'
        });

        // The time changer is utilizing OWF.Intents
        // This is a point-to-multi-point communication scheme that is configured on the fly
        // through OWF
        $('#datetimepicker').on('changeDate', function(e) {
            console.log("e: " + e.date);

            var cmd = {
                action:'setTime',
                dataType:'application/vnd.owf.universe.command'
            };
            var data = {
                time: e.date.toString()
            };

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", [cmd,data]);
            } else {
                OWF.Intents.startActivity(
                    cmd, data,
                    function (dest) {
                    }
                )
            }
        });
	});
})