universe-ozone-widget
=====================

An Ozone Widget for the Universe.js library
-------------------------------------------

This widget exposes the key methods of the Universe.js library through OWF Widget Intents and Events.  This readme describes what methods are exposed and what data needs to be sent to make use of the interfaces.  It also describes what configuration needs to be done in order to make the widget work with your OWF installation.

Use of this widget is allowed under the same license as Universe.js (MIT)

Exposed Methods
---------------
1. Play/Pause (Event, Intent)
2. Change Time (Event, Intent)
3. Add Ground Point (Event, Intent and Drag and drop)
4. Add Space Object (Event, Intent and Drag and drop)
5. Turn on/off Sun Lighting (Event, Intent)
6. Turn on orbit tracks for Space Objects (Event, Intent)
7. Show Sensor Footprint (Event, Intent)

Getting Started
---------------

1. Downloading and serving the Universe Widget
* clone this repository or download it as a zip file
* copy the contents of the _site directory to your web server or serve the Universe Widget using jekyll
2. Configure the widgets for your web server
* modify the widgetUrl property of descriptor.html to point at the correct URL for where the widget is being served from
* if you want to use the test widget, modify the widgetUrl property of test_widget_descriptor.html
3. Add the widgets to your running Ozone Widget Framework using the correct descriptor URLs

Commanding the Universe through Events
--------------------------------------
Events are sent on the "com.solidyn.universe-commands" channel.  The message sent is a JSON string that contains an action and the data necessary to perform that action.  Below is a listing of the actions and the properties that must be set.

* Play

        {
            action: "play",
            playbackSpeed: 500 // seconds per second
        }
* Pause

        {
            action: "pause"
        }
* Set Universe Time

		{
		    action:'setTime',
		    time: new Date().toString() // date as a string
		}
* Add Ground Object

		{
		    action: "addGroundObject",
		    lat: 40,   // decimal degrees
			lon: -104, 
			alt: 0,    // km
			name: "point name"
		}
* Remove ground Object

		{
			action: "removeGroundObject",
			name: "point name"
		}
		
* Add Space Object

		{
			action = "addSpaceObject",
			// ECI position and velocity
            x: -14213.99162, // km
            y: -39987.86471,
            z: -1115.314875,
            vx: 2.865601523, // km/s
            vy: -1.007157587,
            vz: -0.410247122,
			epoch: new Date().toString(), // date as a string
			name: "name"
        }

* Remove Space Object

		{
			action: "removeSpaceObject",
			name: "name"
		}
		
* Toggle Sun Lighting

		{
            action:'setSunLighting',
            sunLightingState: true // (or false)
        }
* Show Orbit Track for Space Object

		{
			action: "addPropagationLine",
			name: "name"
		}
* Hide Orbit Track for Space Object

		{
			action: "removePropagationLine",
			name: "name"
		}
		
Commanding the Universe through Intents
--------------------------------------
Intents can be sent to the Universe widget for all of the commands.  The list below defines the intent data type, action and data that should be sent for each command.

* Play

		{
            action:'play',
            dataType:'application/vnd.owf.universe.command'
        }
        data: {
            playbackSpeed: 500 // seconds per second
        }
* Pause

        {
            action:'pause',
            dataType:'application/vnd.owf.universe.command'
        }
        data: {}
* Set Universe Time

		{
            action:'setTime',
            dataType:'application/vnd.owf.universe.command'
        }
		data: {
		    time: new Date().toString() // date as a string
		}
* Add Ground Object

		{
		    action:'add',
			dataType:'application/vnd.owf.latlonalt'
		}
		data: {
		    lat: 40,   // decimal degrees
			lon: -104, 
			alt: 0,    // km
			name: "point name"
		}
* Remove ground Object

		{
		    action:'remove',
			dataType:'application/com.solidyn.universe.objectid'
		}		
		data: {
			name: "point name"
		}
		
* Add Space Object
		
		{
            action:'add',
			dataType:'application/vnd.owf.universe.spaceobject'
        }
		data: {
			// ECI position and velocity
            x: -14213.99162, // km
            y: -39987.86471,
            z: -1115.314875,
            vx: 2.865601523, // km/s
            vy: -1.007157587,
            vz: -0.410247122,
			epoch: new Date().toString(), // date as a string
			name: "name"
        }

* Remove Space Object
		
		{
		    action:'remove',
			dataType:'application/com.solidyn.universe.objectid'
		}
		data: {
			name: "name"
		}
		
* Toggle Sun Lighting
		
		{
            action:'setSunLighting',
            dataType:'application/vnd.owf.universe.command'
        }
		data: {
            sunLightingState: true // (or false)
        }
* Show Orbit Track for Space Object

		{
		    action:'addPropagationLine',
		    dataType:'application/com.solidyn.universe.objectid'
		}
		data: {
			name: "name"
		}
* Hide Orbit Track for Space Object
		
		{
		    action:'removePropagationLine',
			dataType:'application/com.solidyn.universe.objectid'
		}
		data: {
			name: "name"
		}