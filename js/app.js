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
    zoom: 18,
    center: laboratoriaLima
  });
  var marker = new google.maps.Marker({
    position: laboratoriaLima,
    map: map,
    /*  title: 'hola',
    animation: google.maps.Animation.DROP */
  });
}
function buscar() {
  if (navigator.geolocation) {//
    var latitud, longitud;

    var funcionExito = function(posicion) {
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
     
      var map = new google.maps.Map(document.getElementById('map')); 
      map.setZoom(18);
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


