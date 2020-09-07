const getLocation = async function() {
	const data = {};
	if ('geolocation' in navigator) {
		console.log('geolocation available');
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			displayLocation(latitude, longitude);
			data.lat = latitude;
			data.lon = longitude;
			sendRequest(data);
		});
	} else {
		console.log('geolocation unavailable');
	}
};

const sendRequest = function(data) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	fetch('/api', options).then(async (response) => console.log(await response.json()));
	// fetch('https://pepinieradenuci.ro/wp-json').then(async (response) => console.log(await response.json()));
};

const displayLocation = function(lat, lon) {
	document.getElementById('latitude').textContent = lat;
	document.getElementById('longitude').textContent = lon;
};

const getElem = function(id) {
	return document.getElementById(id);
};

const main = function() {
	var geolocate = getElem('geolocate');
	console.log(geolocate);
	geolocate.addEventListener('click', getLocation);
};

window.addEventListener('load', main);
