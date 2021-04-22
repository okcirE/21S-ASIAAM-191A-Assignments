//let lat = 34.0709;
//let long = -118.444;
//let zoom = 5;
// Bonus: Using Objects
let myMap = {'center': [33.997002,-117.732590],'zoom':10}
const map = L.map('map').setView(myMap.center, myMap.zoom);
//const map = L.map('map').setView([lat, long], zoom);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers
// let work = L.marker([34.0709, -118.444]).addTo(map)
// 		.bindPopup('Where I work on campus')

// let home = L.marker([37.7409, -122.484]).addTo(map)
// 		.bindPopup('Where I currently am')

// let random = L.marker([39.7409, -122.484]).addTo(map)
// 		.bindPopup('Third Point')

function addMarker(lat, long, msg, significance){
    console.log(msg, significance)
    L.marker([lat, long]).addTo(map).bindPopup(msg + significance) // '${msg} ${significance}'
    createButton(lat, long, msg)
    return msg
}

function createButton(lat, long, msg){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+msg; // gives the button a unique id
    newButton.innerHTML = msg; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",long); // sets the longitude 
    newButton.addEventListener('click', function(){map.flyTo([lat,long]);}) //this is the flyTo from Leaflet
    document.body.appendChild(newButton); //this adds the button to our page.
}

addMarker(34.026950,-117.896330, "Merry's House of Chicken", ': I recommend the Ayam Penyet or Ayam Goreng Kremes.')
addMarker(34.058420, -117.937250, 'Bakmi Parahyangan', ': I recommend the Mie Ayam Jamur Cincang.')
addMarker(34.07958, -118.083474,'Medan Kitchen', ': I recommend the Nasi Kuning.')
addMarker(34.089088, -117.558925,'Java Bistro', ': I recommend the Nasi Bungkus Padang.')
addMarker(34.09459, -118.126622,'Borneo Kalimantan Cuisine', ': I recommend the Mie Karet Hokkien.')
    