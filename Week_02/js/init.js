

// JavaScript const variable declaration
const map = L.map('map').setView([34.0709, -118.444],2);


// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map)
		.bindPopup('UCLA! This is where I currently am studying at.')
		.openPopup();
let marker1 = L.marker([34.0788,-117.6646]).addTo(map)
		.bindPopup('Home!')
		.openPopup();
let marker2 = L.marker([-6.1187,106.7863]).addTo(map)
		.bindPopup('Birthplace!')
		.openPopup();
		

fetch("js/map.geojson")
		.then(response => {
			return response.json();
			})
	.then(data =>{
		// Basic Leaflet method to add GeoJSON data
							// the leaflet method for adding a geojson
			L.geoJSON(data, {
				style: function (feature) {
					return {color: 'red'};
					}
			}).bindPopup(function (layer) {
					return layer.feature.properties.name;
			}).addTo(map);
		});