<template>
    <div id="map" class="map rounded box-shadow h-100 mt-0"></div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const map = ref(null);
const markers = ref([]);

const props = defineProps({
    position: {
        type: Object,
        required: true,
    },
    isPositionReady: {
        type: Boolean,
        required: true,
    },
})

onMounted(() => {
    const unwatch = watch(
        () => props.isPositionReady, 
        (ready) => {
            if (ready) {
                initializeMap(props.position.lat, props.position.long);
                unwatch();
            }
        }
    );
});

const initializeMap = async (lat, lng) => {
    const container = document.getElementById('map');
    
    const options = {
        center: new kakao.maps.LatLng(lat, lng), // 사용자 위치로 중앙 설정
        level: 6, // 축소 레벨
        draggable: false, // 마우스 드래그 불가
        scrollwheel: false, // 마우스 스크롤 불가
        disableDoubleClickZoom: true, // 더블클릭 -> 줌 인 불가
    };

    map.value = new kakao.maps.Map(container, options);

    const clusterer = new kakao.maps.MarkerClusterer({
        map: map.value,
        averageCenter: true,
        minLevel: 1,
    });

    try {
        const params = { lat, lng };
        const res = await axios.get(`/api/home/rooms/map`, {params});

        if(res.status === 200) {
            if(res.data.length === 0) {
                console.log('주변에 매물이 없습니다.'); return;
            }

            const data = res.data;
            data.forEach((item) => {
                const markerPosition = new kakao.maps.LatLng(item.roomLat, item.roomLong);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    // title: item.title,
                });

                kakao.maps.event.addListener(marker, 'click', () => {
                    const infoWindow = new kakao.maps.InfoWindow({
                        // content: `<div style="padding:5px;font-size:12px;">${item.title}</div>`
                    });

                    infoWindow.open(map.value, marker);
                });

                markers.value.push(marker);
            });
    
            clusterer.addMarkers(markers.value);
        }
    } catch (error) {
        console.error('마커 데이터 조회 실패:', error);
    }
}
</script>