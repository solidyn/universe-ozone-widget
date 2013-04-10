OWF.ready(function() {
	$(document).ready(function() {
		$("#add_ground_point").on("click", function() {
			OWF.Intents.startActivity(
                {
                    action:'add', dataType:'application/vnd.owf.latlonalt'
                }, {
                    lat: 40,
					lon: -104,
					alt: 5280,
					name: "boulder"
                },
                function (dest) {

                }
            )
		});
		
		$("#remove_ground_point").on("click", function() {
			OWF.Intents.startActivity(
                {
                    action:'remove', dataType:'application/com.solidyn.universe.objectid'
                }, {
					name: "boulder"
                },
                function (dest) {

                }
            )
		});

        $("#play").on("click", function() {
            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", "play");
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'play', dataType:'application/vnd.owf.universe.command'
                    }, {},
                    function (dest) {
                    }
                )
            }

        });

        $("#pause").on("click", function() {
            if ($("#eventRadio").is(':checked')) {
                OWF.Eventing.publish("com.solidyn.universe-commands", "pause");
            } else {
                OWF.Intents.startActivity(
                    {
                        action:'pause', dataType:'application/vnd.owf.universe.command'
                    }, {},
                    function (dest) {
                    }
                )
            }
        });
	});
})