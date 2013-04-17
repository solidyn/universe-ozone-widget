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
	                    action:'remove', dataType:'application/vnd.owf.universe.objectid'
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
	                    action:'remove', dataType:'application/vnd.owf.universe.objectid'
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
	                    action:'addPropagationLine', dataType:'application/vnd.owf.universe.objectid'
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
	                    action:'removePropagationLine', dataType:'application/vnd.owf.universe.objectid'
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

        $('#sunLightingCheckbox').on('click', function() {
            var isChecked = $("#sunLightingCheckbox").is(":checked");
            console.log("Sun clicked: " + isChecked);

            var data = {
                action:'setSunLighting',
                sunLightingState:$("#sunLightingCheckbox").is(":checked")
            }

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", data);
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'setSunLighting',
                        dataType:'application/vnd.owf.universe.command'
                    }, data,
                    function (dest) {
                    }
                )
            }
        });

		

        $('#lockCameraCheckbox').on('click', function() {
            var isChecked = $("#lockCameraCheckbox").is(":checked");
            console.log("Lock Camera clicked: " + isChecked);

            var data = {
                action:'lockCamera',
                lockCameraState:$("#lockCameraCheckbox").is(":checked")
            }

            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", data);
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'lockCamera',
                        dataType:'application/vnd.owf.universe.command'
                    }, data,
                    function (dest) {
                    }
                )
            }
        });

        $('#ellipseRadio').on('click', function() {
            $('#ellipseSensorControls').show();
            $('#rectangularSensorControls').hide();
        });
        $('#rectangleRadio').on('click', function() {
            $('#ellipseSensorControls').hide();
            $('#rectangularSensorControls').show();
        });

		$("#add_sensor").on("click", function() {
			var data = {
				object: "rock"
			};
			
			if ($('#ellipseRadio').is(":checked")) {
				data.sensorType = "ellipse";
				data.name = "ellipse";
				data.semiMajor = $("#semiMajor").val();
				data.semiMinor = $("#semiMinor").val();
			} else if($('#rectangleRadio').is(":checked")) {
				data.name = "rectangle";
				data.sensorType = "rectangle";
				data.height = $("#rectangleHeight").val();
				data.width = $("#rectangleWidth").val();
			}
			
			data.alongTrack = $("#alongTrack").val();
			data.crossTrack = $("#crossTrack").val();
			data.radial = $("#radial").val();

			if ($("#eventRadio").is(':checked')) {
				data.action = "addSensor";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'add',
						dataType:'application/vnd.owf.universe.sensor'
	                }, 
					data,
	                function (dest) {

	                }
	            );
			}
		});
		
		$("#remove_sensor").on("click", function() {
			var data = {
				object: "rock"
			};
			
			if ($('#ellipseRadio').is(":checked")) {
				data.name = "ellipse";
			} else if($('#rectangleRadio').is(":checked")) {
				data.name = "rectangle";
			}
			
			if ($("#eventRadio").is(':checked')) {
				data.action = "removeSensor";
				OWF.Eventing.publish("com.solidyn.universe-commands", data);
			} else {
				OWF.Intents.startActivity(
	                {
	                    action:'remove',
						dataType:'application/vnd.owf.universe.sensor'
	                }, 
					data,
	                function (dest) {

	                }
	            );
			}
		});
	});
})