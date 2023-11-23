  //kilde brukt til pauseknapp https://www.w3schools.com/tags/av_met_pause.asp
  function pauseVid(videoId, btnId) {  
    const video = document.getElementById(videoId);  
    const videoBtn =  document.getElementById(btnId);
      if (video.paused) {
      video.play();
      videoBtn.innerHTML = "Pause";
    } else {
      video.pause();
      videoBtn.innerHTML = "Start";
    }
  }  
  

  //INITIATE MAP
    const centerLat = 59.2523923
    const centerLong = 10.7986503
    //let map = L.map('map').setView([centerLat, centerLong], 13);
   /* let map = L.map('mapContainer', {
        center: [centerLat, centerLong],
        zoom: 10,
        scrollWheelZoom: false,
        interactive: true 
   
    })*/
    //SET MAP CONSTRUCTOR
    /*L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}', {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
    }).addTo(map) */
/*
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 

        maxZoom: 46, minZoom: 7,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

  */  
  let map = L.map('mapContainer', {
    minZoom: 0,
    maxZoom: 5,
    center: [-100, 180],
    zoom: 2,
    crs: L.CRS.Simple, 
    scrollWheelZoom: false
  });

    const w = 5692;
    const h = 3200;
    const url = 'elingaardmap.png';
    const southWest = map.unproject([ 0, h], map.getMaxZoom()-1);
    const northEast = map.unproject([ w, 0], map.getMaxZoom()-1);
    const bounds = new L.LatLngBounds( southWest, northEast);

    L.imageOverlay( url, bounds).addTo(map);

    map.setMaxBounds(bounds);

/*
    var imageUrl = 'map2.png',
   imageBounds = [[59.25391379679315, 10.797237818503786], [59.254396, 10.797226]];
    L.imageOverlay(imageUrl).addTo(map);

*/   


const places = [
        {name: "-50 50", year: "2016", lat: -50, long: 50,},
        {name: "0 0", year: "2016", lat: 0, long: 0,},
        {name: "-100 180", year: "2016", lat:-100, long: 180,},
]
console.log(places)

const markerIcon = L.icon({
        iconUrl: 'marker.svg',
        iconSize: [40,40],
        iconAnchor: [20,40],
        popupAnchor: [0, -20]
    })

    function fly() {
    L.marker[place.lat, place.long].openPopup();
    map.flyTo([place.lat,place.long],4);
    };

    let navHTML = ""
 
    places.map((place) => {
        
        L.marker([place.lat, place.long], {icon: markerIcon}).addTo(map).bindPopup(`${place.name}`)
        
        navHTML += `<button id="mapBtn" onclick="map.flyTo([${place.lat},${place.long}],2)">${place.name}</button>` 
        console.log("p" + place)
    })
    
    document.getElementById("btnContainer").innerHTML = navHTML 


function visBoks() { 
const faktabutton = document.getElementById("timelineBtn");
const faktaboks = document.getElementById("faktaboks");
if (faktaboks.style.display === "none" || faktaboks.style.display === "") {
faktaboks.style.display = "block";
faktabutton.innerHTML = "Lukk tidslinje over noe";
} else {
faktaboks.style.display = "none";
faktabutton.innerHTML = "Klikk for tidslinje over noe";
}
}


function isInViewport(el) {
const rect = el.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
} 

//Scroll Jens 
document.addEventListener('scroll', function () {
if(isInViewport(document.getElementById("jtxt1"))) {
  document.getElementById("changingBg1").style.backgroundImage = "url(closeup.jpg)"
} 
if(isInViewport(document.getElementById("jtxt2"))) {
 document.getElementById("changingBg1").style.backgroundImage = "url(1closeup.jpg)"
} 
if(isInViewport(document.getElementById("jtxt3"))) {
  document.getElementById("changingBg1").style.backgroundImage = "url(2closeup.jpg)"
}
}, {
 passive: true
});

//Scroll Birte 
document.addEventListener('scroll', function () {
if(isInViewport(document.getElementById("txt1"))) {
  document.getElementById("changingBg2").style.backgroundImage = "url(closeup.jpg)"
} 
if(isInViewport(document.getElementById("txt2"))) {
 document.getElementById("changingBg2").style.backgroundImage = "url(1closeup.jpg)"
} 
if(isInViewport(document.getElementById("txt3"))) {
  document.getElementById("changingBg2").style.backgroundImage = "url(2closeup.jpg)"
}
}, {
 passive: true
});
