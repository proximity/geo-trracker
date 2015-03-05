var $ = require('jquery');

$(function() {
	var map;
	var $map = $('#map');
	var $latlng = $('#latlng');
	var watcher;

	var $startBtn = $('#startWatching').on('click', startWatching);
	var $stopBtn = $('#stopWatching').on('click', stopWatching);

	var map = new google.maps.Map($map[0], {
		zoom: 18,
		minZoom: 6,
	});

	var marker = new google.maps.Marker({
		map: map,
		flat: true,
	});

	function startWatching() {
		if ( ! window.navigator.geolocation) {
			$latlng.html('Geolocation is not supported by your browser');
			return;
		}

		function success(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			$latlng.html('<strong>Latitude:</strong> ' + parseFloat(latitude + '').toFixed(3) + '&nbsp;&nbsp;&nbsp;<strong>Longitude:</strong> ' + parseFloat(longitude + '').toFixed(3));

			var latlng = new google.maps.LatLng(-41.285093, 174.777487);

			map.setCenter(latlng);
			marker.setPosition(latlng);
		}

		function error() {
			$latlng.html('Unable to retrieve location');
		}

		$latlng.html('Locating...');
		$startBtn.attr('disabled', 'disabled');
		$stopBtn.removeAttr('disabled');

		watcher = navigator.geolocation.watchPosition(success, error);
	}

	function stopWatching() {
		navigator.geolocation.clearWatch(watcher);

		$stopBtn.attr('disabled', 'disabled');
		$startBtn.removeAttr('disabled');
	}
});
