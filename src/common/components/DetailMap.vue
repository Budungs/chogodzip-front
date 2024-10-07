<template>
    <div id="map" class="map"></div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import hospitalImage from '@/assets/img/hospital.png';
import martImage from '@/assets/img/shop.png';
import subwayImage from '@/assets/img/subway.png';

const props = defineProps({
    latitude: {
        type: Number, // Updated to Number to ensure it's treated correctly
        required: true
    },
    longitude: {
        type: Number, // Updated to Number to ensure it's treated correctly
        required: true
    }
});

onMounted(() => {
    loadMap(); // Load map when the component is mounted
});

// Watch for changes to latitude and longitude, and update the map if needed
watch(() => [props.latitude, props.longitude], () => {
    loadMap(); // Reload the map if coordinates change
});

function loadMap() {
    const markerImages = {
        HP8: hospitalImage,
        PM9: hospitalImage,
        MT1: martImage,
        CS2: martImage,
        SW8: subwayImage
    };

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    var mapContainer = document.getElementById('map');
    if (!mapContainer) return; // Ensure the map container is available

    var mapOption = {
        center: new kakao.maps.LatLng(props.latitude, props.longitude), // Center map with props
        level: 3 // Map zoom level
    };

    // Create the map
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // Add a marker at the center
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(props.latitude, props.longitude)
    });

    var ps = new kakao.maps.services.Places(map);

    // Search categories (you can add or remove categories as needed)
    const categories = ['MT1', 'CS2', 'HP8', 'PM9', 'SW8'];
    categories.forEach(category => {
        ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
    });

    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
            }
        }
    }

    function displayMarker(place) {
        let markerImage = markerImages[place.category_group_code] || hospitalImage; // Default image

        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(40, 40)) // Marker size
        });

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 300px;
}
</style>
