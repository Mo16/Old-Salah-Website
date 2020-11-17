var longitude, latitude, address, url

function loadingShow() {
    document.getElementsByClassName("loading")[0].style.display = "flex";
}

function loadingHide() {
    document.getElementById("loadingArea").style.display = "none";
}

function manualEntry() {
    document.getElementById("locationGetArea").style.display = "none";
    document.getElementById("entrypoint").style.display = "flex";
    document.getElementById("locationHolderArea").style.display = "none";
}

function hideEntryPoint() {
    document.getElementById("entrypoint").style.display = "none"; 
}

function postCodeLocate(postcode) {
    var postcode = document.getElementById('name').value;
    postcode.split(" ")
    fetch(`http://api.postcodes.io/postcodes/${postcode}`).then(response => {
        return response.json()  
     }).then(data =>{
         if (data.status == 200){
             longitude = data.result.longitude
             latitude = data.result.latitude
             updateLocationArea(data.result.admin_district)
             getTimes(latitude, longitude);
             hideLocation();
             hideEntryPoint();
             document.getElementById("errorMsg").style.display = "none"; 
            }
            else{
               document.getElementById("errorMsg").style.display = "flex"; 
            }
        })
}

function getLocation() {
    loadingShow();
    document.getElementById("locationGetArea").style.display = "none";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else { 
        document.getElementById("locationHolder").innerHTML = "Geolocation is not supported by this browser.";
        document.getElementById("locationHolderArea").style.display = "flex";
        document.getElementById("locationGetArea").style.display = "grid";
    }
}

function savePosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    getLocationFromCoords(latitude,longitude)
    getTimes(latitude, longitude);
    hideLocation();
}

function getLocationFromCoords(lat,long){
    fetch(`http://api.postcodes.io/postcodes?lon=${long}&lat=${lat}`).then(response =>{
        return response.json()
        }).then(data =>{
            value = data.result[0].admin_district
            updateLocationArea(value)
        })
}

function showError(error) {
    loadingHide();
    document.getElementById("locationHolderArea").style.display = "flex";
    document.getElementById("locationGetArea").style.display = "flex";
    var locationHolder = document.getElementById("locationHolder");
    switch(error.code) {
        case error.PERMISSION_DENIED:
        locationHolder.innerHTML = "Please enable location services or allow this page to use your location.";
        break;
    case error.POSITION_UNAVAILABLE:
        locationHolder.innerHTML = "Location information is unavailable.";
        break;
    case error.TIMEOUT:
        locationHolder.innerHTML = "The request to get the location timed out.";
        break;
    case error.UNKNOWN_ERROR: 
        locationHolder.innerHTML = "An unknown error occurred.";
        break;
  }
}

function hideLocation() {
    document.getElementById("locationGetArea").style.display = "none";
    document.getElementById("locationHolderArea").style.display = "flex";
    document.getElementById("timeContainer").style.display = "grid";
}

function updateLocationArea(address) {
    document.getElementById("locationHolder").innerHTML = address;
}

function getTimes(lat, long) {
    var timestamp = Math.floor(Date.now() / 1000);
    fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=2&tune=0,1,0,5,33,3,0,0`).then(response => {
        return response.json()  
     }).then(data =>{
         var times = data.data.timings
         timePopulate(times)
         getJamatTimes()
     })
     loadingHide();
}

function timePopulate(timings) {
    document.getElementById("fajr").innerHTML = timings.Fajr;
    document.getElementById("zuhr").innerHTML = timings.Dhuhr;
    document.getElementById("asr").innerHTML = timings.Asr;
    document.getElementById("maghrib").innerHTML = timings.Maghrib;
    document.getElementById("isha").innerHTML = timings.Isha;
}

function getJamatTimes() {
    mosque = "masjidnoor"
    fetch(`./${mosque}.json`).then(response => {
        return response.json()  
     }).then(data =>{
         var times = data
         jamatTimePopulate(times)
     })
     loadingHide();
}


function jamatTimePopulate(timings) {
    document.getElementById("j-fajr").innerHTML = timings.fajr;
    document.getElementById("j-zuhr").innerHTML = timings.zuhr;
    document.getElementById("j-asr").innerHTML = timings.asr;
    document.getElementById("j-maghrib").innerHTML = timings.maghrib;
    document.getElementById("j-isha").innerHTML = timings.esha;
}