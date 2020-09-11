const getLocation = async function(img) {
	const data = {};
	data.img = img;
	if ('geolocation' in navigator) {
		console.log('geolocation available');
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			displayLocation(latitude, longitude);
			data.lat = latitude;
			data.lon = longitude;
			data.text = getText('field');
			sendRequest(data);
		});
	} else {
		console.log('geolocation unavailable');
	}
};

const getText = function(id) {
	return document.getElementById(id).value;
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
	fetch(`/weather/${data.lat},${data.lon}`).then(async (response) => console.log(await response.json()));
};

const displayLocation = function(lat, lon) {
	document.getElementById('latitude').textContent = lat;
	document.getElementById('longitude').textContent = lon;
};

const getElem = function(id) {
	return document.getElementById(id);
};

const main = function(video) {
	var geolocate = getElem('geolocate');
	geolocate.addEventListener('click', function(){
		video.loadPixels();
		const image64 = video.canvas.toDataURL();
		// console.log(image64);
		getLocation(image64);
	});
	// linkbehavior();
};

const setup = function(){
	noCanvas();
  	const video = createCapture(VIDEO);
	video.size(240, 160);
	main(video);
}

window.setup = setup;
