OWF.ready(function() {
	$(document).ready(function() {
		$("#add_ground_point").on("click", function() {
			var data = {
                action: "addGroundObject",
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
                action: "removeGroundObject",
				name: "boulder"
			};

			if ($("#eventRadio").is(':checked')) {
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'remove', dataType:'application/com.solidyn.universe.objectid'
	                },
					data,
	                function (dest) {

	                }
            	);
			}
		});
		
		$("#add_space_object").on("click", function() {
			var data = {
                x: -14213.99162,
	            y: -39987.86471,
	            z: -1115.314875,
	            vx: 2.865601523,
	            vy: -1.007157587,
	            vz: -0.410247122,
				epoch: new Date().toString(),
				name: "rock"
            };
			if ($("#eventRadio").is(':checked')) {
				data.action = "addSpaceObject";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'add', dataType:'application/vnd.owf.universe.spaceobject'
	                }, 
					data,
	                function (dest) {

	                }
	            );
			}
		});
		
		$("#remove_space_object").on("click", function() {
			var data = {
				name: "rock"
			};

			if ($("#eventRadio").is(':checked')) {
				data.action = "removeSpaceObject";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'remove', dataType:'application/com.solidyn.universe.objectid'
	                },
					data,
	                function (dest) {

	                }
            	);
			}
		});
		
		$("#add_propagation_line_for_space_object").on("click", function() {
			var data = {
				name: "rock"
			};

			if ($("#eventRadio").is(':checked')) {
				data.action = "addPropagationLine";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'addPropagationLine', dataType:'application/com.solidyn.universe.objectid'
	                },
					data,
	                function (dest) {

	                }
            	);
			}
		});
		
		$("#remove_propagation_line_for_space_object").on("click", function() {
			var data = {
				name: "rock"
			};

			if ($("#eventRadio").is(':checked')) {
				data.action = "removePropagationLine";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'removePropagationLine', dataType:'application/com.solidyn.universe.objectid'
	                },
					data,
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
	
		owfdojo.query(".space-object").connect('onmousedown', this, function(e) {
	        e.preventDefault();
	        var data = {
				dataType: "application/vnd.owf.universe.spaceobject",
	            name: $(e.currentTarget).text(),
	            x: $(e.currentTarget).attr("x"),
	            y: $(e.currentTarget).attr("y"),
				z: $(e.currentTarget).attr("z"),
				vx: $(e.currentTarget).attr("vx"),
				vy: $(e.currentTarget).attr("vy"),
				vz: $(e.currentTarget).attr("vz"),
				epoch: new Date().toString()
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