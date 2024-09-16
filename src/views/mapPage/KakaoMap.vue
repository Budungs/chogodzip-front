<template>
    <div id="map" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const map = ref(null);
  const markers = ref([]);
  
  onMounted(() => {
    // Create the map
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // Seoul City Hall coordinates
      level: 5, // Map zoom level
    };
  
    map.value = new kakao.maps.Map(container, options);
  
    // Clusterer for grouping markers
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map.value,
      averageCenter: true,
      minLevel: 7,
    });
  
    // Example markers data (replace this with your dynamic data)
    const markerData = [
      { lat: 37.5665, lng: 126.9780, title: 'Marker 1' },
      { lat: 37.5655, lng: 126.9760, title: 'Marker 2' },
      { lat: 37.5645, lng: 126.9750, title: 'Marker 3' },
    ];
  
    // Create markers
    markers.value = markerData.map(({ lat, lng, title }) => {
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({ position: markerPosition, title });
      return marker;
    });
  
    // Add markers to the clusterer
    clusterer.addMarkers(markers.value);
  });
  </script>
  
  <style scoped>
  #map {
    border-radius: 8px;
   
  }
  </style>
  