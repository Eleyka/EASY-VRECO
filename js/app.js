function initMap() {
  var laboratoriaLima = {lat: -12.1191427,
    lng: -77.0349046};
    /* Autocompletado */
  var inputGoing = document.getElementById('pointGoing');
  var inputDestiny = document.getElementById('pointDestiny');

  new google.maps.places.Autocomplete(inputGoing);
  new google.maps.places.Autocomplete(inputDestiny);
  /* Fin de  Autocompletado */
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: laboratoriaLima
  });
  var marker = new google.maps.Marker({
    position: laboratoriaLima,
    map: map,
    /*  title: 'hola',
    animation: google.maps.Animation.DROP */
  });
  /* trazar ruta */
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputGoing.value,
      destination: inputDestiny.value,
      travelMode: 'DRIVING'

    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta');
      }
    });
  };

  //Ruta en bicicleta
  var calculateAndDisplayRouteBicycling = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputGoing.value,
      destination: inputDestiny.value,
      travelMode: 'BICYCLING'

    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No hay ruta para bicicletas');
      }
    });
  }; //Ruta en bicicleta fin

  directionsDisplay.setMap(map);

  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('trazar-ruta').addEventListener('click', trazarRuta);

  //funcion ruta en bicicleta 
  var trazarRutaBicycling = function() {
    calculateAndDisplayRouteBicycling(directionsService, directionsDisplay);
  };
  document.getElementById('ruta-bicicleta').addEventListener('click', trazarRutaBicycling); //funcion ruta en bicicleta fin
  /* Fin de trazar ruta */
}
function buscar() {
  if (navigator.geolocation) {//
    var latitud, longitud;

    var funcionExito = function(posicion) {
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
     
      var map = new google.maps.Map(document.getElementById('map')); 
      map.setZoom(15);
      map.setCenter({lat: latitud,
        lng: longitud});

      var miUbicacion = new google.maps.Marker({
        position: {lat: latitud,
          lng: longitud},
        map: map,
      });
    };

    var funcionError = function(error) {
      alert('Tenemos un problema con encontrar su ubicación');
    }; 

    navigator.geolocation.getCurrentPosition(funcionExito, funcionError);//
  }
}
document.getElementById('encuentrame').addEventListener('click', buscar);
