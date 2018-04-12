$(document).ready(function(){
	$("#location").live("pageshow",function(event, ui){
		var lnk = $(".getDirections");
		if ($("#gMapScript").length == 0) {
			var script = document.createElement("script");
			script.id = "gMapScript";
			script.type = "text/javascript";
			script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDPz3WScgpnjKAbcg2Pc3uU-9ZBQVhjMvE&sensor=false&callback=gMapInitialize";
			document.body.appendChild(script);
		}
		if (lnk.attr("href") == "#") {
			navigator.geolocation.getCurrentPosition(
				function(p) { 
					var url = "http://maps.google.com/maps?saddr=##START_DEST##&daddr=-27.961336,153.42661";
					lnk.attr("href", url.replace("##START_DEST##", p.coords.latitude + "," + p.coords.longitude)); 
					lnk.css("display", "");
				},
				function() { 
					lnk.css("display", "none");
				}
			);
		}
	});
	$("#share").live("pageshow",function(event, ui){
		if ($("#facebook-jssdk").length == 0) {
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=381944135175712";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));			
		}
	});
});

function gMapInitialize() {
	var loc = new google.maps.LatLng(-27.960509,153.424253);
	
	var mapOptions = {
		zoom: 15,
		center: loc,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("gmap"), mapOptions);
	
	var marker = new google.maps.Marker({
		position: loc,
		map: map,
		title:"Sea World Whale Watch"
	});
}

function launchGetDirections(){
	var newWin = window.open();
	var url = "http://maps.google.com/maps?saddr=##START_DEST##&daddr=-27.960509,153.424253";
	navigator.geolocation.getCurrentPosition(
		function(p) { 
			newWin.location = url.replace("##START_DEST##", p.coords.latitude + "," + p.coords.longitude); 
		},
		function() { 
			newWin.close();
			alert("Could not get your current location."); 
		}
	);
}