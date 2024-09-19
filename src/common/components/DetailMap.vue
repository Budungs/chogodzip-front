<template>
    <div id="map" class="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import hospitalImage from '@/assets/img/hospital.png';
import martImage from '@/assets/img/shop.png';
import subwayImage from '@/assets/img/subway.png';

const props = defineProps({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

onMounted(() => {
    // Kakao 지도 API 스크립트 동적으로 로드

    const markerImages = {
        HP8: hospitalImage,
        PM9: hospitalImage,
        MT1: martImage,
        CS2: martImage,
        SW8: subwayImage
    };

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(props.latitude, props.longitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(props.latitude, props.longitude)
    });

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 카테고리로 은행을 검색합니다
    ps.categorySearch('MT1', placesSearchCB, { useMapBounds: true });
    ps.categorySearch('CS2', placesSearchCB, { useMapBounds: true });
    ps.categorySearch('HP8', placesSearchCB, { useMapBounds: true });
    ps.categorySearch('PM9', placesSearchCB, { useMapBounds: true });
    ps.categorySearch('SW8', placesSearchCB, { useMapBounds: true });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
            }
        }
    }

    function displayMarker(place) {
        // 카테고리에 맞는 마커 이미지 선택 (예: 은행이면 다른 아이콘)
        let markerImage = markerImages[place.category_group_code]; // 기본값: 병원 이미지 사용

        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
            image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(40, 40)) // 마커 이미지 설정
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }

});
</script>

<style scoped>
#map {
    width: 100%;
    height: 350px;
}
</style>
