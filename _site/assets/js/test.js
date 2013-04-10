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
                    //dest is an array of destination widget proxies
                    // if (dest.length > 0) {
                    //                      for (var i = 0; i < dest.length; i += 1) {
                    //                          var json = JSON.parse(dest[i].id);
                    //                          var widgetId = json.id;
                    //                          var proxy = dest[i].id;
                    //                          timeReceiverProxies.push(widgetId);
                    //                      }
                    //                  } else {
                    //                      // alert('Intent was canceled');
                    //                  }
                }
            )
		});
	});
})