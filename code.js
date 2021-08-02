//Got starter code from demo recording


fallbackLocation ={latitude:-37.871972, longitude:175.689232};  // Hobbiton
var photosArray =[];
let currentPhoto = 0;


// function apiUrl(coords, term){
//     "https://flickr.com/services/rest/" +
//     "?api_key=200aed0990a7bf83e651c306dd7546e8" +
//     "&format=json" +
//     "&nojsoncallback=1" +
//     "&method=flickr.photos.search" +
//     "&safe_search=1" +
//     "&per_page=5" +
//     "&lat=" + coords.latitude +
//     "&lon=" + coords.longitude +
//     "&text=" + term; 
// }

function assembleImageSourceURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}
// console.log(assembleImageSourceURL(dogs))
// const imageUrl = assembleImageSourceURL(response.photos.photo[0]);


function showPhotos (data) {
	console.log(data)
	photosArray = data.photos.photo
	// photosArray.push(data.photos.photo);
    console.log(photosArray)

	// Look at the first photo and turn it into an <img src=___> tag
	console.log(assembleImageSourceURL(photosArray[currentPhoto]))
    let img = document.createElement("img")
    img.src = assembleImageSourceURL(photosArray[currentPhoto])
	// Append the image tag to the page
    document.body.append(img)


}


button = document.getElementsByClassName("button");
for(let i=0; i < photosArray.length; i ++){
button[i].addEventListener("click", function (){
    currentPhoto +=1
});
}

function processResponse (response) {
	let responsePromise = response.json()
	responsePromise.then(showPhotos)
}
console.log(photosArray)

function requestPhotos (location) {
	console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

	let myApiKey = "200aed0990a7bf83e651c306dd7546e8"
	let url = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=' + myApiKey + '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat='+location.latitude +'&lon='+ location.longitude +'&text=car'

	let fetchPromise = fetch(url)
	fetchPromise.then(processResponse)
}

function useCurrentLocation (pos) {
	console.log("Using actual location")
	console.log(pos)
	requestPhotos(pos.coords)
}

function useFallbackLocation () {
	console.log("Using fallback location")
	requestPhotos(fallbackLocation)
}

let options = {
	enableHighAccuracy: true,
	maximumAge: 0
}

navigator.geolocation.getCurrentPosition(useCurrentLocation, useFallbackLocation, options)


