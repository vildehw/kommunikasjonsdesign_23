 //funksjon for å åpne kildeboks
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

    //Function to check if element is in viewport  
    //hentet fra forelesnignmateriell
     function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0 && rect.bottom >= 0) || 
            (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth))
        );
    }   

    //Change background header  
    //hentet fra forelesnignmateriell
    document.addEventListener('scroll', function () {
            if (isInViewport(document.getElementById("scrollHeader"))){
                document.getElementById("changingBg").style.backgroundImage = "url(img/skoleNY_1.jpg)"
            } 
            if(isInViewport(document.getElementById("txt1"))) {
                document.getElementById("changingBg").style.backgroundImage = "url(img/Cis12.JPG)"
            }
        }, {
            passive: true
        }); 

    
    
    //Kode for kart 
    //hentet fra forelesningmateriell

    //INITIATE MAP
    const centerLat = 59.2798008
    const centerLong = 10.9654856
    let map = L.map('mapContainer', {
        center: [centerLat, centerLong],
        zoom: 10,
        scrollWheelZoom: false, 
    }) 

    //SET MAP CONSTRUCTOR   
    //Plugin for grayscale er hentet fra https://github.com/Zverik/leaflet-grayscale
    L.tileLayer.grayscale('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, 
        fadeAnimation: false,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <a href="https://freeicons.io/web-application-v.1-3/pin-web-app-gps-location-marker-icon-104645">| Ikon: freeicons</a>'
    }).addTo(map);
    
    //PLACES
    const places = [
        {name: "Do Re Mi barnehage Greåker", year: "1998", lat: 59.2668223, long: 11.0324908},
        {name: "Do Re Mi barnehage Fredrikstad", year: "2003", lat: 59.2264130, long: 10.9223920},
        {name: "Do Re Mi barnehage Sør-Afrika", year: "2005", lat: -27.8656, long: 31.5168},
        {name: "Hinkenhopp barnehage Greåker", year: "2006", lat: 59.2758532, long: 11.0420155}, 
        {name: "Do Re Mi barnehage Begby", year: "2007", lat: 59.2114230, long: 10.9957750}, 
        {name: "Do Re Mi barnehage Halden", year: "2009", lat: 59.1119070, long: 11.2739750}, 
        {name: "Do Re Mi barnehage Våler", year: "2010", lat: 59.4956511, long: 10.8512358}, 
        {name: "Barnas Kulturhus Fredrikstad", year: "2011", lat: 59.2019505, long: 10.9624076}, 
        {name: "Children's international school Fredrikstad", year: "2012", lat: 59.2019505, long: 10.9624076}, 
        {name: "Children's international school Moss", year: "2015", lat: 59.4403410, long: 10.6695940},
        {name: "Dibber International Sollentuna", year: "2018", lat: 59.4534257, long: 17.9232969}, 
        {name: "Dibber International Rydebak", year: "2018", lat: 55.9620312, long: 12.7801931}, 
        {name: "Children's international school Sarpsborg", year: "2019", lat: 59.2921041, long: 11.0957227}, 
        {name: "Philini Instituttet Privatist skole", year: "2019", lat: 59.2921041, long: 11.0957227}, 
        {name: "Christianslund Barnehage Fredrikstad", year: "2022", lat: 59.2280253, long: 10.9273878},   
    ] 

    const geojson = {
        type: "FeatureCollection", 
        //map laget med hjelp fra chatgpt
        //henter koordinater fra places og skriver ut geoJson objekter for å tegne linjer mellom punktene på kartet 
        //forhindrer mye repeterende kode 
        features: places.map((place, index, array) => {
            
        const nextPlace = array[index + 1];
        //console.log(nextPlace)
        const coordinates = nextPlace
        ? [
            [place.long, place.lat],
            [nextPlace.long, nextPlace.lat]
        ]
        : [
            [place.long, place.lat]
          ];
            return { 
            type: "Feature",
            properties: {},
            geometry: {
                coordinates: coordinates,
                type: "LineString"
            }
            };
        })
    };  
    //console.log(geojson)

    const geoJsonStyle = {
        "color": "#b61010",
        "weight": 3,
        "opacity": 0.5
    }

    
    L.geoJSON(geojson, {
        style: geoJsonStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.popupContent)
        }
    }).addTo(map)

    
    //ikon hentet fra https://freeicons.io/web-application-v.1-3/pin-web-app-gps-location-marker-icon-104645
    const markerIcon = L.icon({
        iconUrl: 'img/marker.png',
        iconSize: [40,40],
        iconAnchor: [20,40],
        popupAnchor: [0, -20]
    })

    places.map((place) => {
        L.marker([place.lat, place.long], {icon: markerIcon}).addTo(map).bindPopup(`${place.name} startet opp i ${place.year}`)
    }) 

    document.addEventListener('scroll', function () {
        if(isInViewport(document.getElementById("start"))) {
            map.flyTo([centerLat, centerLong], 10)
        }
        if(isInViewport(document.getElementById("p1"))) {
            map.flyTo([places[0].lat, places[0].long], 16)
        }
        if(isInViewport(document.getElementById("p2"))) {
            map.flyTo([places[1].lat, places[1].long], 16)
        }
        if(isInViewport(document.getElementById("p3"))) {
            map.flyTo([places[2].lat, places[2].long], 8)
        }
        if(isInViewport(document.getElementById("p4"))) {
            map.flyTo([places[3].lat, places[3].long], 17)
        }
        if(isInViewport(document.getElementById("p5"))) {
            map.flyTo([places[4].lat, places[4].long], 17)
        } 
        if(isInViewport(document.getElementById("p6"))) {
            map.flyTo([places[5].lat, places[5].long], 17)
        } 
        if(isInViewport(document.getElementById("p7"))) {
            map.flyTo([places[6].lat, places[6].long], 17)
        } 
        if(isInViewport(document.getElementById("p8"))) {
            map.flyTo([places[7].lat, places[7].long], 17)
        } 
        if(isInViewport(document.getElementById("p9"))) {
            map.flyTo([places[8].lat, places[8].long], 17)
        } 
        if(isInViewport(document.getElementById("p10"))) {
            map.flyTo([places[9].lat, places[9].long], 17)
        } 
        if(isInViewport(document.getElementById("p11"))) {
            map.flyTo([places[10].lat, places[10].long], 13)
        } 
        if(isInViewport(document.getElementById("p12"))) {
            map.flyTo([places[11].lat, places[11].long], 13)
        } 
        if(isInViewport(document.getElementById("p13"))) {
            map.flyTo([places[12].lat, places[12].long], 17)
        } 
        if(isInViewport(document.getElementById("p14"))) {
            map.flyTo([places[13].lat, places[13].long], 17)
        } 
        if(isInViewport(document.getElementById("p15"))) {
            map.flyTo([places[14].lat, places[14].long], 17)
        } 
    }, {
        passive: true
    });  