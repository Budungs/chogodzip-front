import { ref } from 'vue';

export function useGeolocation() {
    const position = ref({ lat: null, long: null });
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
                    isPositionReady.value = true;
                }
            );
        } else {
            // Geolocation이 지원되지 않는 경우
            console.log('Geolocation 지원되지 않음');
            position.value.lat = 37.5451021;
            position.value.long = 127.0854269;
            isPositionReady.value = true;
        }
    };

    return {
        position,
        isPositionReady,
        getCurrentLocation,
    };
}
