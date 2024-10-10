<template>
    <div id="map" class="map rounded box-shadow h-100 mt-0"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// const props = defineProps({
//     latitude: {
//         type: Number,
//         required: true
//     },
//     longitude: {
//         type: Number,
//         required: true
//     }
// });

const map = ref(null);
const markers = ref([]);

onMounted(() => {
    //맵 표시할 컨테이너 생성
    const container = document.getElementById('map');

    //카카오맵 옵션 설정
    const options = {
        center: new kakao.maps.LatLng(37.5451021, 127.0854269), //중앙 마커 좌표
        level: 6, //축소 레벨
        draggable: false, //마우스 드래그 불가
        scrollwheel: false, //마우스 스크롤 불가
        disableDoubleClickZoom: true, //더블클릭 -> 줌 인 불가
    };

    //위에서 생성한 컨테이너와 옵션으로 맵 생성 
    map.value = new kakao.maps.Map(container, options);
  
    //마커 클러스터 생성
    const clusterer = new kakao.maps.MarkerClusterer({
        map: map.value,
        averageCenter: true,
        minLevel: 1,
    });

    //임시 마커 데이터
    const markerData = [
        { lat: 37.548216, lng: 127.071552, title: '빠오즈푸'},
        { lat: 37.546244, lng: 127.067613, title: '힘톤씨의 주방'},
        { lat: 37.550347, lng: 127.073165, title: '세종대'},
        { lat: 37.546332, lng: 127.075361, title: '가츠시 옆'},
        { lat: 37.555686, lng: 127.079639, title: '군자역 옆1'},
        { lat: 37.553955, lng: 127.083149, title: '군자역 옆2'},
        { lat: 37.557257, lng: 127.082040, title: '군자역 옆3'},
        { lat: 37.561685, lng: 127.077845, title: '군자역 옆4'},
        { lat: 37.567835, lng: 127.069670, title: '군자역 옆5'},
        { lat: 37.538675, lng: 127.093554, title: '건대 옆1'},
        { lat: 37.540143, lng: 127.097992, title: '건대 옆2'},
        { lat: 37.532738, lng: 127.087728, title: '건대 옆3'},
        { lat: 37.5325, lng: 127.0784, title: '건대 옆4'},
        { lat: 37.5348, lng: 127.0781, title: '건대 옆5'},
        { lat: 37.536333, lng: 127.080215, title: '건대 옆6'},
        { lat: 37.539580, lng: 127.087160, title: '건대 옆7'},
    ];

    //임시 마커 좌표에 표시 & 마커 클릭시 창에 이름 표시
    markers.value = markerData.map(({ lat, lng, title }) => {
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({ position: markerPosition, title });

        kakao.maps.event.addListener(marker, 'click', () => {
            const infoWindow = new kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${title}</div>`
            });

            infoWindow.open(map.value, marker);
            }
        );
        return marker;
    });
    clusterer.addMarkers(markers.value);
});
</script>