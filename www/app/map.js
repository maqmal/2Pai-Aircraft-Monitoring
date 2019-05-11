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
      paramMap.setLintang(data.dataHasil[1]);
      paramMap.setBujur(data.dataHasil[2]);
      redraw(paramMap.getLintang(), paramMap.getBujur());
  });

  //Make map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: paramMap.getLintang(), lng : paramMap.getBujur(), alt: 0}
  });

  //make marker
  map_marker = new google.maps.Marker({position: {lat: paramMap.getLintang(), lng: paramMap.getBujur()}, map: map});
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