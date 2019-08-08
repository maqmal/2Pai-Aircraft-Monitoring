var paramMap = {
    lintang 	: -6.9147439 , //Bandung
    bujur 		: 107.609809875, //Bandung
    setLintang : function(data){
        this.lintang = parseFloat(data);
    },
    setBujur : function(data){
        this.bujur = parseFloat(data);
    },
    getLintang : function(){
       return this.lintang;
    },
    getBujur : function(){
       return this.bujur  ;
    }
};
var lineCoordinatesArray = [];

function mapUpdate(){
  const socket = io.connect();
  socket.on('dataCoordinate' ,(data)=> {
      paramMap.setLintang(data.dataHasil[0]);
      paramMap.setBujur(data.dataHasil[1]);
      redraw(paramMap.getLintang(), paramMap.getBujur());
  });

  //Make map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: paramMap.getLintang(), lng : paramMap.getBujur(), alt: 0},
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  map_marker = new google.maps.Marker({
    position: {lat: paramMap.getLintang(), 
    lng: paramMap.getBujur()}, 
    map: map
  });
  map_marker.setMap(map);


  function redraw(Lintang, Bujur) {
    map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
    map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

    pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

    var lineCoordinatesPath = new google.maps.Polyline({
        path: lineCoordinatesArray,
        geodesic: true,
        strokeColor: '#ffeb3b',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      lineCoordinatesPath.setMap(map); 
  }

  function pushCoordToArray(latIn, lngIn) {
    lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
  }
}