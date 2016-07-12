/*globals L google*/
/*eslint-env browser, jquery*/
  // i know the next three lines are horrible .... 
var car_d='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wUdDyIM4HdJXgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEJUlEQVRIx+2WXYhUZRjHf+85Z86Zz/0ct9l13Y9sZAXdND82XAu/Fi8SEozAUBDZoJsEKSFKgq68iW676aqL0EDKCLbCpA0RV3fRzV1XHQ1d3R1zv2fmzMw5c+Y8XWREsIsZ1Ab5u3pvHn48D//n4VXMg4g0AYc919mcz0xHQ9HKGq/keo6dzQeCwbhSekRELkeqai8BbyulsjwmxjzSpUB3qWC/eunbEw1T47fL+dlJveyVCMaqKWZnMa2Q27Kmc8PydS8mYvGEIyLvK6Vm/7ZYRCxgrz03tT/Vd7phqPcrt6v7qHH3aj93rvSxftc+nHzOzk1PRAa+/lTQtcaWVR07qhLLMiLy4ePIDRHR3XTKN+uTFqAjUjl6pa/p5sVed8u+twJWOKaWtq1l7Pog4nmFUCSWjlXXNWzcfTCf6vs+YprB5YYV3BetXhIRkeOAANXAZWBSKVVeqOMPVE1jG5AE8vnMTF3JLWpFO2MqTcP3PYyAiW4YzPxyL1RT39Ti2BlVXd+sta7dHDx/8hNQqrlyScPB6kTTG07R9gNmcCpaUzcMHAauzSdWRTvTP3K2Z93EaAo3n6PseeSmH5DPzlIRT1AuuQDYM5MEY1UoBeL7lNwiRsCiaGdQSsP3yyCCYVq0tG+irXMnDSvaB5RS6+ft2HPdxPj1QW4O9GKFo5S9EqYVQukG0+O3MQIm4vtouoGbz1L2PJQCpekUXQdN0whV1GCFowSsEPnsDKkLp/FKRSJVtbULh0uJ7fsewXCMHd3voek6dS0rGB3u5/q57xi7MUgwEns4H4UeCPzx1jU0zaCr+13s2UmaVnfwc/+PjF7tZ3SoDzMUWbagWIkKeSWXrQeOUPZc0qlrjJztIblxGy1rNuEUsmQm0vw2Y/k9/fheCTMU4aVDx5gZu81Q7ykufXOC1jWdNCTbmXswhvjlBVOtabruFLNzIHD/1jC+75PPzpK+NcSKju2UikWscAwjYKE0jVjNU1TEE1iRCpY0JclOphnqPUV98lmsaCV3RwZo69wp0ep4/9yD8QXNhhkKj23Ytf/48g1bD4yc62nUAxb1yXZ/+MwXsnrLy/ruIx+NAqZf9nzxfdcKRTWlab5TyNlWOKqboWj8zpXz5r1rAxV1LSvde1cvFGbv36Xr9aOvAccWFGuG+fEzG7edcAv2nuZVHYPjqZ8ah3/4svL5Pd3nY/EEuhE4CXwOVD2smQJ0MxwNPlzHzxpXPhfWAybpG4PhF/a+ma5KLLsJWEqpVx55SUTkkFPInZ2bGHPGbgzmSk7xsoi8IyKxR9R1iUiPiNzKzUycE5EzIrJdRIL8F2h9ulUtilhE6v6U6n/RXVwsce1iidViiQuLJY7wv0YtsHM7gTygAwHg4l/5T4lIHNDsXNaJRGM6YCulHJ7whCf8k/wKIlDaOHkfIDgAAAAASUVORK5CYII=';
var fan_r='data:image/png:base64,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';
var fan_g='data:image/png:base64,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';
var tsldash;
var fence;
var reddot=new L.icon({iconUrl:'red.png'});

//
// call periodically the status of the node-red app
//
var TSLDash = function() {
    var thiz=this;
    var map;
    var car;
    var olddata=null;
    var rssiMeterOptions = {
    	min: -50, 
		max: 10, 
		yellowFrom: -30, 
		yellowTo: -20, 
		greenFrom: -20, 
		greenTo: 0,
		redFrom: 0, 
		redTo: 10, 
		minorTicks: 5
	};
    var rssiMeter;
    
	var loaded=function() {
		rssiMeter = new google.visualization.Gauge(document.getElementById('rssiMeter'));
		$('#rssid-val').on('click', thiz.setRssiVal);
		$('#load').on('click', loadFence);
		$('#save').on('click', storeFence);
		map.on('click', addDot);
		thiz.getData();
	};

    this.start=function() {
		map = L.map('map');
/*
  		L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
 
				attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
				maxZoom: 18
		}).addTo(map);
*/
		L.tileLayer('http://tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);
		var caricon=L.icon({iconUrl: car_d});
		car = L.marker([50.1,7.136], { icon: caricon}).addTo(map);
		map.panTo([50.7, 7.136]);
		map.setZoom(14);
		loadFence();

		google.load('visualization', '1', {packages: ['gauge'], callback:loaded});
    };

    this.getData=function () {
		$.ajax({url: "/status",
			success: thiz.getDataOK,
			error: thiz.getDataErr,
			dataType: "json"
		});
		window.setTimeout(thiz.getData, 5000);
    };
    this.getDataOK=function (data) {
		//var data=data1.global;
		//console.dir(data);
		if (olddata === null) olddata=data;

		$('#car-lat').text(data.gps.lat).css('color', olddata.gps.lat === data.gps.lat?"green":"red");
		$('#car-lng').text(data.gps.lng).css('color', olddata.gps.lng === data.gps.lng?"green":"red");
		car.setLatLng(L.latLng(data.gps.lat, data.gps.lng));
		map.panTo(L.latLng(data.gps.lat, data.gps.lng));

		$('#bt-rssi').text(data.rssi).css('color', olddata.rssi === data.rssi?"green":"red");
		$('#bt-rssimin').text(data.rssimin).css('color', olddata.rssimin === data.rssimin?"green":"red");
		//$('#fan').prop('src', data.lastcmd=='on'?fan_g:fan_r);
		$('#fan').css('background-color', data.lastcmd==='on'?'green':'red');

		$('#time').text(new Date().toLocaleString());
		thiz.drawRssiMeter(data);
		olddata=data;

    };
    this.drawRssiMeter=function (data) {
		var rssi=Math.floor(data.rssi||-50);
		var rssimin=Math.floor(data.rssimin||-50);
		var min = Math.min(rssimin, rssi);
		var max = Math.max(rssimin, rssi);

		var rssiMeterData = new google.visualization.DataTable();

		rssiMeterData.addColumn('number', 'Rssi');
		rssiMeterData.addRows(2);
		rssiMeterData.setCell(0, 0, rssi);

		rssiMeterOptions.min=min-15;
		rssiMeterOptions.max=max+5;
				
		rssiMeterOptions.greenFrom=rssimin;
		rssiMeterOptions.yellowTo=rssimin;
		// draw space from min to yellowTo half yellow, half red
		var step=Math.floor(Math.abs(rssimin-rssiMeterOptions.min)/2);
		rssiMeterOptions.yellowFrom=rssimin-step;
		rssiMeterOptions.redTo=rssimin-step;

		rssiMeterOptions.redFrom=Math.min(min,rssimin)-2*step;
		//console.dir(rssiMeterOptions);
		rssiMeter.draw(rssiMeterData, rssiMeterOptions);
    };
	
    /**
     * @callback
     */
    this.getDataErr=function (xhr, sts, txt) {
	    thiz.error("Ajax Error: sts='"+sts+"', txt='"+txt+"'");
    };
    this.setRssiVal=function() {
		$.ajax({url: "/status",
			success: thiz.getDataOK,
			error: thiz.getDataErr,
			dataType: "json",
			method: 'POST',
			data:"rssimin="+$('#rssid-val-text').val().trim()
			});
    };

	/*******************************************
	 * Fence mgmt
	 ********************************************/
	
	
	var addDot=function(me) {
		// see which existing dot is close to the mouse event me as p1
		// find the adjacent nodes of p1 closest to me
		// insert me between them
		var ll=fence.getLatLngs();
		var i, l=ll.length;
		var p0=me.latlng, p1=null, p2=null;
		if (l < 2) {
			// there is no or only one dot in the fence - just add anew one
			fence.addLatLng([me.latlng.lat, me.latlng.lng]);
		} else {
			var dist=0x07ffffff; // max 32bit signed int
			var p, dlat, dlng;
			var d=Math.sqrt(dlat*dlat+dlng*dlng);
			for (i=0; i<l; i++) {
				p=ll[i];
				dlat=p0.lat-p.lat;
				dlng=p0.lng-p.lng;
				d=Math.sqrt(dlat*dlat+dlng*dlng);
				if (d < dist) {
					p1=i;
					dist=d;
				}
			}
			// find closest adjacent
			p2=(p1+l-1)%l;
			p=ll[p2];
			dlat=p0.lat-p.lat;
			dlng=p0.lng-p.lng;
			dist=Math.sqrt(dlat*dlat+dlng*dlng);
			p=ll[(p1+l+1)%l];
			dlat=p0.lat-p.lat;
			dlng=p0.lng-p.lng;
			d=Math.sqrt(dlat*dlat+dlng*dlng);
			if (d < dist) p2=(p1+l+1)%l;
			console.log("add dot @"+p1+"/"+p2);
			if (p1 > p2) { var t=p1; p1=p2; p2=t;}
			// special case: p1 and p2 are beginning and end of array
			if (p1 === 0 && p2 === l-1) {
				fence.addLatLng(p0);
			} else {
				fence.spliceLatLngs(p2, 0, p0);
			}
		}
		L.marker(me.latlng, {icon: reddot}).addTo(map).on('click', removeDot);
		$('#save').prop( "disabled", l+1 <= 2 );
	};

	
	
	
	
	var loadFenceOK=function(data) {
		var ll=[];
		var i;
		fencers=data;
		if (data.fence) {
			try {
				ll=JSON.parse(data.fence);
			} catch (e) {
				ll=data.fence;
			}
			for (i=0; i<ll.length; i++) {
				L.marker([ll[i].lat, ll[i].lng], {icon: reddot}).addTo(map).on('click', removeDot);
			}
		}
		fence=L.polygon(ll, {color: 'red'}).addTo(map);
		//
		// position map to fit car & fence in browser window
		//
		ll=fence.getLatLngs();
		var b=L.latLngBounds(ll);
		b.extend(car.getLatLng());
		map.fitBounds(b, {animate: true, duration: 2.0});
		$('#save').prop( "disabled", ll.length <= 2 );
		$('#load').prop( "disabled", false);
	};

	var loadFence=function() {
		// load the fence definition from bluemix
		//
		$('#download').show();
		$.ajax({
			url: "/fence",
			contenttype: "application/json",
			method: "GET",
			success: function( data ) {
				$('#download').fadeOut(1000);
				$('#received').fadeIn(1000);
				window.setTimeout(function() {$('#received').fadeOut(1000);}, 2000);
				loadFenceOK(data);
			},
			error: function(a, b) {
				thiz.error("Cannot load fence data, reason given: '"+a+"':'"+b+"'");
			}
		});
	};
	var fencers;
	var removeDot=function(me) {
		var ll=fence.getLatLngs();
		var i, l=ll.length;
		for (i=0; i<l; i++) {
			var p=ll[i];
			var dx=p.lat-me.latlng.lat; // distance of a dot in fence to position clicked on map
			var dy=p.lng-me.latlng.lng;
			if (dy === 0 || dx === 0) {
				fence.spliceLatLngs(i, 1);
				l--;
				break;
			}
		}
		map.removeLayer(me.target); // delete dot clicked on;
		$('#save').prop( "disabled", l <= 2 );
	};


	var storeFence=function() {
		var ll=JSON.parse(JSON.stringify(fence.getLatLngs())); // I get strange errors (cannot read 'lat' of unknown) without stringify/parse
		var data={ fence: ll };
		if (fencers._id !== undefined) data._id=fencers._id;
		if (fencers._rev !== undefined) data._rev=fencers._rev;
		// upload to bluemix
		$.ajax({
			url: "/fence",
			data: data,
			contenttype: "application/json",
			method: "POST",
			/**
			* @callback
			*/
			success: function( data ) {
				$('#upload').show();
				window.setTimeout(function() {
				$('#upload').fadeOut(2000);
				}, 2000);
				loadFence(); // to update _rev
			}
		});
	};




    this.error=function(txt) {
    	var e=$('#error-log');
		e.text(txt);
		e.fadeIn();
		window.setTimeout(function() {e.fadeOut();}, 5000);
    };
};
function start() {
	tsldash=new TSLDash();
	tsldash.start();
}
$(document).ready(start);
