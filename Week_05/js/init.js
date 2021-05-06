const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



let url = "https://spreadsheets.google.com/feeds/list/1B4i_sIm2ZkO55QovaA-hCQdektzh0wO4nGCBwTONY0w/ojv30kb/public/values?alt=json"
fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
        console.log(data)
    })

function addMarker(lat,lng,message){
        L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${message}</h2>`)
        return message    
}

addMarker(37,-122,'home land!')

// let dog_breeds = ['German Shepherd','Bulldog','Poodle']
// dog_breeds.forEach(thoughts);
// function thoughts(data){
//     console.log(data + ' is soooo cute!')
// }

function processData(theData){
    const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
    const rows = theData.feed.entry // this is the weird Google Sheet API format we will be removing
    // we start a for..of.. loop here 
    for(const row of rows) { 
      const formattedRow = {}
      for(const key in row) {
        // time to get rid of the weird gsx$ format...
        if(key.startsWith("gsx$")) {
              formattedRow[key.replace("gsx$", "")] = row[key].$t
        }
      }
      // add the clean data
      formattedData.push(formattedRow)
    }
    // lets see what the data looks like when its clean!
    console.log(formattedData)
    // we can actually add functions here too
    formattedData.forEach(addMarker)
}