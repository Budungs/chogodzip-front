import { computed, ref } from 'vue';
import axios from 'axios';

const init = {
    lat: '', long: '',
    si: '', gu: '',
    isPositionReady2: false,
}

export function useGeolocation() {
    const state = ref({...init});

    const lat = computed(() => state.value.lat);
    const long = computed(() => state.value.long);
    const si = computed(() => state.value.si);
    const gu = computed(() => state.value.gu);
    const isPositionReady2 = computed(() => state.value.isPositionReady2);

    const position = ref({lat:null, long:null})
    const siGuPosition = ref({ si: null, gu: null});
    const isPositionReady = ref(false);

    const getCurrentLocation = async (area) => {
        // 관심지역 있을 경우
        if(area !== null && area.trim().length > 0) {
            await revertToNum(`서울시 ${area}`);

            state.value.si = '서울시'
            state.value.gu = area;
            state.value.isPositionReady2 = true

        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (p) => {
                        state.value.lat = p.coords.latitude;
                        state.value.long = p.coords.longitude;
                        
                        revertToGu(state.value.lat, state.value.long);
                        state.value.isPositionReady2 = true;

                    },
                    (error) => {
                        console.log('위치 정보 가져오기 실패: ', error);
                        
                        // 실패 시 기본 위치 설정
                        state.value.lat= 37.5451021;
                        state.value.long = 127.0854269;
    
                        state.value.si = '서울시';
                        state.value.gu = '광진구';
                        state.value.isPositionReady2 = true;

                    }
                );

            } else {
                // Geolocation이 지원되지 않는 경우
                console.log('Geolocation 지원되지 않음');
                state.value.lat= 37.5451021;
                state.value.long = 127.0854269;
                state.value.si = '서울시';
                state.value.gu = '광진구';
                state.value.isPositionReady2 = true;
            }
        }


    };

    const revertToGu = async (lat, long) => { 
        try {
            const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}`;
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `KakaoAK ${import.meta.env.VITE_KAKAO_API}` 
                }
            });

            if(res.data.documents.length === 0) {
                state.value.si = '서울';
                state.value.gu = '광진구';
            } else {
                state.value.si = `${res.data.documents[0].address.region_1depth_name}`;
                state.value.gu = res.data.documents[0].address.region_2depth_name;
            }
        } catch (error) {
            console.error('주소 변환 실패:', error);
        }
    };


    const revertToNum = async (area) => { 
        try {
            const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${area}`;
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `KakaoAK ${import.meta.env.VITE_KAKAO_API}` 
                }
            });
            
            state.value.long = res.data.documents[0].x;
            state.value.lat = res.data.documents[0].y;

            return { long: res.data.documents[0].x, lat: res.data.documents[0].y};

        } catch (error) {
            console.error('주소 변환 실패:', error);
        }
    };

    return {
        lat, long, si, gu, isPositionReady2, state,
        isPositionReady,
        getCurrentLocation,
        revertToGu,
        siGuPosition,
    };
}
