 function initialize() {
    var mapa = new google.maps.LatLng(12.879721, 121.774017);
    var myOptions = {
      zoom: 5,
      center: mapa,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
        
        
    var marker = new google.maps.Marker({
        
       position: mapa,
       map: map,
       draggable: true,
          
    })
        
  }