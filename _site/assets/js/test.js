OWF.ready(function() {
	$(document).ready(function() {
		$("#add_ground_point").on("click", function() {
			var data = {
                action: "add",
                lat: 40,
				lon: -104,
				alt: 5280,
				name: "boulder"
            };
			if ($("#eventRadio").is(':checked')) {
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
                action: "remove",
				name: "boulder"
			};

			if ($("#eventRadio").is(':checked')) {
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'remove', dataType:'application/com.solidyn.universe.objectid'
	                }, data,
	                function (dest) {

	                }
            	);
			}
		});

        $("#play").on("click", function() {
            var data = {
                    action:'play',
                    playbackSpeed: $('#playbackSpeedInput').val()
                };

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", data);
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'play',
                        dataType:'application/vnd.owf.universe.command'
                    }, data,
                    function (dest) {
                    }
                )
            }

        });

        $("#pause").on("click", function() {
            var data = {
                    action:'pause',
                    dataType:'application/vnd.owf.universe.command'
                };

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", data);
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'pause',
                        dataType:'application/vnd.owf.universe.command'
                    }, data,
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

            var data = {
                action:'setTime',
                time: e.date.toString()
            };

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", data);
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'setTime',
                        dataType:'application/vnd.owf.universe.command'
                    }, data,
                    function (dest) {
                    }
                )
            }
        });
	});
})