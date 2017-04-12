function locationTabClick() {
    $('a[href="#locationTab"]').one('shown.bs.tab', function (e) {
        initMap();
    });
}

var map, infoWindow;
function initMap() {
    var latlng = new google.maps.LatLng(-36.864608, 174.7738821);
    map = new google.maps.Map(document.getElementById('map'));
    infoWindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            geocodeLatLng(geocoder, map, infoWindow, pos);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    browserHasGeolocation ? noGeolocationAccept() : noGeolocationSupport();
}

function geocodeLatLng(geocoder, map, infowindow, pos) {
    geocoder.geocode({ 'location': pos }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(17);
                infoWindow.setPosition(pos);
                infowindow.setContent("<p>Your current location: <p>" + results[1].formatted_address);
                infowindow.open(map);
            } else {
                // if no results, just open window at current location with no address
                infoWindow.setPosition(pos);
                infoWindow.setContent('Your location');
                infoWindow.open(map);
            }
        } else {
            geocodeFailed(status);
        }
    });
}

function noResultsClick() {
    swal({
        title: "No Results",
        text: "Please search for another pole",
        type: "error",
        confirmButtonColor: "#aac341"
    });
}

function noGeolocationAccept() {
    swal({
        title: "Geolocation service failed",
        text: "Please refresh page and allow browser to locate you",
        type: "warning",
        confirmButtonColor: "#aac341"
    });
}

function noGeolocationSupport() {
    swal({
        title: "No geolocation support",
        text: "Your browser does not support geolocation",
        type: "warning",
        confirmButtonColor: "#aac341"
    });
}

function geocodeFailed(status) {
    swal({
        title: "Location address lookup failed",
        text: "Reason: " + status,
        type: "warning",
        confirmButtonColor: "#aac341"
    });
}

function toIndex() {
    window.location.href = "index.html";
}

function singleResultClick() {
    window.location.href = "result-single.html";
}

function multipleResultClick() {
    window.location.href = "result-multiple.html";
}