import { ref } from 'vue';
import axios from 'axios';

export function useGeolocation() {
    const position = ref({ lat: null, long: null });
    const siGuPosition = ref({ si: null, gu: null});
    const isPositionReady = ref(false);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (p) => {
                    position.value.lat = p.coords.latitude;
                    position.value.long = p.coords.longitude;
                    isPositionReady.value = true;
                },
                (error) => {
                    console.log('위치 정보 가져오기 실패: ', error);
                    
                    // 실패 시 기본 위치 설정
                    position.value.lat = 37.5451021;
                    position.value.long = 127.0854269;

                    siGuPosition.value.si = '서울시';
                    siGuPosition.value.gu = '광진구';
                    isPositionReady.value = true;
                }
            );
        } else {
            // Geolocation이 지원되지 않는 경우
            console.log('Geolocation 지원되지 않음');
            position.value.lat = 37.5451021;
            position.value.long = 127.0854269;
            siGuPosition.value.si = '서울시';
            siGuPosition.value.gu = '광진구';
            isPositionReady.value = true;
        }
    };

    const revertToGu = async () => { 
        try {
            const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.value.long}&y=${position.value.lat}`;
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `KakaoAK ${import.meta.env.VITE_KAKAO_API}` 
                }
            });
            
            siGuPosition.value.si = `${res.data.documents[0].address.region_1depth_name}`;
            siGuPosition.value.gu = res.data.documents[0].address.region_2depth_name;

        } catch (error) {
            console.error('주소 변환 실패:', error);
        }
    };

    return {
        position,
        isPositionReady,
        getCurrentLocation,
        revertToGu,
        siGuPosition,
    };
}
