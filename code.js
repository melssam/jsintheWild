//Got starter code from thursday/friday demo recording


const fallbackLocation ={latitude:-37.871972, longitude:175.689232};  // Hobbiton
let photosArray =[];
var currentPhoto = 0;
let container = document.getElementById("photoContainer")
let photoObj;
let newPhoto;
var intervalId = null


function assembleImageSourceURL (photo) {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
}

let startBtn = document.getElementById("start");
let stopBtn =document.getElementById("stop")

startBtn.onclick = startInterval
let g;
function startInterval() {
			g = setInterval(function(){
		currentPhoto +=1
		container.removeChild(container.firstChild)
		let img = document.createElement("img")
		img.src = assembleImageSourceURL(photosArray[currentPhoto])
		container.append(img)

        	},1000)
	}


stopBtn.onclick =stopInterval
function stopInterval(){
	clearInterval(g)
	container.innerHTML = ""
	currentPhoto = 0
	console.log(currentPhoto)
	let img = document.createElement("img")
	img.src = assembleImageSourceURL(photosArray[currentPhoto])
container.append(img)
} 

	
	
		
	

function showPhotos (data) {
	console.log(data)
	photosArray = data.photos.photo
    console.log(photosArray)

	console.log(assembleImageSourceURL(photosArray[currentPhoto]))
    let img = document.createElement("img")
	img.setAttribute("id","imgOne")
    img.src = assembleImageSourceURL(photosArray[currentPhoto])

    container.append(img)
	
}


function processResponse (response) {
	let responsePromise = response.json()
	responsePromise.then(showPhotos)
}

function requestPhotos (location) {
	console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

	let myApiKey = "200aed0990a7bf83e651c306dd7546e8"
	let url = "https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key="+ 
	 myApiKey + 
	 "&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat="+
	 location.latitude +
	 "&lon="+ 
	 location.longitude 
	
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

