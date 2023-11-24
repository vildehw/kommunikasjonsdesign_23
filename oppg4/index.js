  
  
  //pauseknapp 
  //kilde brukt https://www.w3schools.com/tags/av_met_pause.asp
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


  //Funkjson for å vise boks ved trykk på knapp 
  function showTimeline() { 
    const faktabutton = document.getElementById("timelineBtn");
    const timeline = document.getElementById("timeline");
    if (timeline.style.display === "block") {
      timeline.style.display = "none";
      faktabutton.innerHTML = "Klikk for tidslinje over noe"; 
    } else {
      timeline.style.display = "block";
      faktabutton.innerHTML = "Lukk tidslinje over noe";
    }
    } 

    function showContent() { 
      const kildeBtn = document.getElementById("kildeBtn");
      const kilder = document.getElementById("kilder");
      if (kilder.style.display === "block") { 
          kilder.style.display = "none";
          kildeBtn.innerHTML = "Vis kilder brukt i artikkelen";
      } else {
          kilder.style.display = "block";
          kildeBtn.innerHTML = "Lukk kilder brukt i artikkelen";
      }
      } 
  

  //INITIATE MAP
  let map = L.map('mapContainer', {
    minZoom: 0,
    maxZoom: 5,
    center: [-100, 180],
    zoom: 2,
    crs: L.CRS.Simple, 
    scrollWheelZoom: false,
  });

  //kilde for kode til bruk av bilde i leaflet https://stackoverflow.com/questions/53308706/leafletjs-custom-map-with-a-single-image-png-file-showing-multiple-maps
    const w = 5692;
    const h = 3200;
    const url = 'img/elingaardmap.png';
    const southWest = map.unproject([ 0, h], map.getMaxZoom()-1);
    const northEast = map.unproject([ w, 0], map.getMaxZoom()-1);
    const bounds = new L.LatLngBounds( southWest, northEast);

    L.imageOverlay( url, bounds, {
      attribution: '<a href="https://freeicons.io/web-application-v.1-3/pin-web-app-gps-location-marker-icon-104645">Ikon: freeicons</a>'
    }).addTo(map);

    map.setMaxBounds(bounds);

  //kilde for resterende kode for kart er hentet fra forelesningsmateriell
  const places = [
    {name: "Kjelleren", lat: -87, long: 230, description: " til Jens Bjelkes ble oppført i 1645. Benyttet som fengsel under Bjelkes tid, i Huitfeldt-Kaas tid benyttet som lagring av øl og vin til selskapeligheter (som det var mye av)."},
    {name: "Likkammeret", lat: -93, long: 154, description: "til familien Huitfeldt er eneste rommet på gården som fremdeles innehar sitt opprinnelige utseende. Det ble oppført på kommando fra Birgitte og Henrik Jørgen. Likkammeret er laget for å gi adelen ære i døden, hvor den avdøde ble omkranset av sin medfødte rett. Birgitte mente det var standsmessig forskjell på mennesker også i himmelen, fattige var fremdeles fattige, og de adelige likedan."},
    {name: "Presteværelset", lat:-88, long: 147, description: " var en gammel skikk, kirkens prest skulle ha eget rom på herregårdene. Presten i Onsøy Kirke hadde god kontakt med familien Huitfeldt-Kaas. På veggene henger bilder av medlemmene av prestefamilien, og møbler som ble gitt i gaver fra familien Apenes."},
  ]   
  console.log(places)

  //ikon hentet fra https://freeicons.io/web-application-v.1-3/pin-web-app-gps-location-marker-icon-104645
  const markerIcon = L.icon({
    iconUrl: 'img/marker.svg',
    iconSize: [45,45],
    iconAnchor: [20,40],
    popupAnchor: [0, -20]
  })

    
    places.map((place) => {
      L.marker([place.lat, place.long], {icon: markerIcon})
      .addTo(map)
      .bindPopup(`${place.name} ${place.description}`) 
    }) 


    /*
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
    */ 



  //kode for å bytte bakrgrunn basert på element i viewport er hentet fra forelesningsmateriell.
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }  


//scrollheader
document.addEventListener('scroll', function () {
  if(isInViewport(document.getElementById("htxt1"))) {
    document.getElementById("changingBg1").style.backgroundImage = "url(img/elingaardimg.jpg)"
  } 
  if(isInViewport(document.getElementById("htxt2"))) {
   document.getElementById("changingBg1").style.backgroundImage = "url(img/IMG_5465.jpg)"
  } 
  }, {
   passive: true
  }); 

//Scroll Jens 
document.addEventListener('scroll', function () {
  if(isInViewport(document.getElementById("jtxt1"))) {
    document.getElementById("changingBg2").style.backgroundImage = "url(img/closeup.jpg)"
  } 
  if(isInViewport(document.getElementById("jtxt2"))) {
   document.getElementById("changingBg2").style.backgroundImage = "url(img/1closeup.jpg)"
  } 
  if(isInViewport(document.getElementById("jtxt3"))) {
    document.getElementById("changingBg2").style.backgroundImage = "url(img/2closeup.jpg)"
  }
  }, {
   passive: true
  });  

  //Scroll Birte
document.addEventListener('scroll', function () {
  if(isInViewport(document.getElementById("btxt1"))) {
    document.getElementById("changingBg3").style.backgroundImage = "url(img/closeup.jpg)"
  } 
  if(isInViewport(document.getElementById("btxt2"))) {
   document.getElementById("changingBg3").style.backgroundImage = "url(img/1closeup.jpg)"
  } 
  if(isInViewport(document.getElementById("btxt3"))) {
    document.getElementById("changingBg3").style.backgroundImage = "url(img/2closeup.jpg)"
  }
  }, {
   passive: true
  }); 


//scrollend
  document.addEventListener('scroll', function () {
if(isInViewport(document.getElementById("etxt1"))) {
  document.getElementById("changingBg4").style.backgroundImage = "url(img/elingaardimg.jpg)"
} 
if(isInViewport(document.getElementById("etxt2"))) {
 document.getElementById("changingBg4").style.backgroundImage = "url(img/IMG_5465.jpg)"
} 
}, {
 passive: true
});