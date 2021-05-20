const map = L.map('map').setView([34.0709, -118.444], 5);

let USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

USGS_USImagery.addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


const url = "https://spreadsheets.google.com/feeds/list/1B4i_sIm2ZkO55QovaA-hCQdektzh0wO4nGCBwTONY0w/ojv30kb/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let recommendedResto = L.featureGroup();
let notRecommendedResto = L.featureGroup();

let exampleOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 100,
    fillOpacity: 0.8
}

function addMarker(data){
  if(data.wouldyourecommendthisrestaurant == "Yes"){
    exampleOptions.fillColor = "blue"
    recommendedResto.addLayer(L.circleMarker([data.lat,data.long],exampleOptions).bindPopup(`<h2>Restaurant is recommended</h2> <b>${data.enterthenameoftherestaurant}</b>: ${data.whydoyourecommendthisornotrecommendthis}</h2>`));
    createButtons(data.lat,data.long,data.enterthenameoftherestaurant)
    }
else{
    exampleOptions.fillColor = "red"
    notRecommendedResto.addLayer(L.circleMarker([data.lat,data.long],exampleOptions).bindPopup(`<h2>Restaurant is NOT recommended</h2> <b>${data.enterthenameoftherestaurant}</b>: ${data.whydoyourecommendthisornotrecommendthis}</h2>`))
    createButtons(data.lat,data.long,data.enterthenameoftherestaurant)
}
return data.timestamp
}

function createButtons(lat,lng,title){
  const newButton = document.createElement("button"); // adds a new button
  newButton.id = "button"; // gives the button a unique id
  newButton.innerHTML = title; // gives the button a title
  newButton.setAttribute("lat",lat); // sets the latitude 
  newButton.setAttribute("lng",lng); // sets the longitude 
  newButton.addEventListener('click', function(){
      map.flyTo([lat,lng]); //this is the flyTo from Leaflet
  })

  const spaceForButtons = document.getElementById("contents")
  spaceForButtons.appendChild(newButton); //this adds the button to our page.
  
}

function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)
        recommendedResto.addTo(map)
        notRecommendedResto.addTo(map)
        let allLayers = L.featureGroup([recommendedResto, notRecommendedResto]);
        map.fitBounds(allLayers.getBounds());       
}



let layers = {
	"Recommended": recommendedResto,
	"Not Recommended": notRecommendedResto
}

L.control.layers(null,layers).addTo(map)