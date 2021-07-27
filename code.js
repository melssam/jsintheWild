function apiUrl(coords, term){
    "https://flickr.com/services/rest/" +
    "?api_key=200aed0990a7bf83e651c306dd7546e8" +
    "&format=json" +
    "&nojsoncallback=1" +
    "&method=flickr.photos.search" +
    "&safe_search=1" +
    "&per_page=5" +
    "&lat=" + coords.latitude +
    "&lon=" + coords.longitude +
    "&text=" + term; 
}





function successOnGeolocation (data){
    console.log(data.coords);
}

function alternateLocation(){
    const fallbackLocation = { latitude: 32.44442, longitude: 3.42131}//somewhere
    console.log("something went wrong with getting current geoposition")
}

navigator.geolocation.getCurrentPosition(successOnGeolocation,alternateLocation)

function fetchDataFromFlicker(location){
    // let url = 
}