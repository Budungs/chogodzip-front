<template>
    <div class="row white-box" style="margin: auto; width: 100%;">
        <div class="col-md-6">
            <div class="table1">
                <div class="info-container">
                    <h4>매물정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>임대 유형</th>
                                <td>{{ (cardData.priceMin === 0 || cardData.priceMin === null) && (cardData.priceMax === 0 || cardData.priceMax === null) ? '전세' : '월세' }}</td>
                            </tr>
                            <tr>
                                <th>보증금</th>
                                <td>{{ cardData.depositMin ? cardData.depositMin + ' 만원 ~ ' + cardData.depositMax + ' 만원' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>월 이용료</th>
                                <td>{{ cardData.priceMin ? cardData.priceMin + ' 만원 ~ ' + cardData.priceMax + ' 만원' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>관리비</th>
                                <td>{{ cardData.maintenanceFee ? cardData.maintenanceFee + ' 만원' : '없음' }} </td>
                            </tr>
                            <tr>
                                <th>이용기간<br />(계약기간)</th>
                                <td>{{ contractMin ? contractMin + '개월' : '제한없음' }}</td>
                            </tr>
                            <tr>
                                <th>이용연령</th>
                                <td>{{ cardData.ageMin && cardData.ageMax ? `${cardData.ageMin} ~ ${cardData.ageMax}세` : '연령제한 없음' }}</td>
                            </tr>
                            <tr>
                                <th>방 개수</th>
                                <td>{{ cardData.roomCnt ? cardData.roomCnt : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>남녀구분</th>
                                <td>{{ genderLimit }}</td>
                            </tr>
                            <tr>
                                <th>기타사항</th>
                                <td>{{ cardData.etc ? cardData.etc : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>제공 서비스</th>
                                <td>{{ parsedServices.includes('청소업체') ? '청소가능' : '청소서비스 미제공' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="table2">
                <div class="info-container table2">
                    <h4>공용시설</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>난방시설</th>
                                <td>{{ cardData.facilityHeating ? cardData.facilityHeating : '난방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>세탁시설</th>
                                <td>{{ cardData.facilityLife && cardData.facilityLife.includes('세탁기') ? '세탁기, 건조기' : '세탁시설 없음' }}
                                </td>
                            </tr>
                            <tr>
                                <th>주방시설</th>
                                <td>{{ cardData.facilityLife && cardData.facilityLife.includes('전자레인지') ? '전자레인지, 전기밥솥' : '주방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>생활시설</th>
                                <td>{{ formattedLifeFacilities }}</td>
                            </tr>
                            <tr>
                                <th>제공비품</th>
                                <td>{{ cardData.facilityLife ? '제공' : '없음' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="info-container table2">
                    <h4>건물정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>건물 형태</th>
                                <td>{{ buildingTypeLabel }}</td>
                            </tr>
                            <tr>
                                <th>주차</th>
                                <td>{{ canParkingLabel }}</td>
                            </tr>
                            <tr>
                                <th>엘리베이터</th>
                                <td>{{ hasElevatorLabel }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    cardData: {
        type: Object,
        required: true
    }
});

// 서비스 파싱
const parsedServices = computed(() => {
    return props.cardData.services && props.cardData.services !== 'null' ? props.cardData.services.split('|') : [];
});

// 생활시설
const formattedLifeFacilities = computed(() => {
    return props.cardData.facilityLife && props.cardData.facilityLife !== 'null' ? props.cardData.facilityLife.split('|').join(', ') : '없음';
});

// 성별 제한
const genderLimit = computed(() => {
    switch (props.cardData.genderLimit) {
        case 'GENDR00001':
            return '성별 무관';
        case 'GENDR00002':
            return '남성 전용';
        case 'GENDR00003':
            return '여성 전용';
        case 'GENDR00004':
            return '남녀 분리';
        default:
            return '성별무관';
    }
});

// 건물 형태
const buildingTypeLabel = computed(() => {
    return props.cardData.buildingType !== null ? (props.cardData.buildingType === 0 ? '상가건물' : '공동주택') : '정보 없음';
});

// 주차 가능 여부
const canParkingLabel = computed(() => {
    return props.cardData.canParking !== null ? (props.cardData.canParking === 0 ? '불가능' : '가능') : '정보 없음';
});

// 엘리베이터
const hasElevatorLabel = computed(() => {
    return props.cardData.hasElevator !== null ? (props.cardData.hasElevator === 0 ? '없음' : '있음') : '정보 없음';
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #cdcad45f;
}

td {
    height: 3.5rem;
    padding-left: 1rem;
    border-bottom: 1px solid #cdcad45f;
}

th {
    background: #F5F6F7;
    padding-left: 1rem;
    border-right: 1px solid #cdcad45f;
    border-bottom: 1px solid #cdcad45f;
}

.info-container {
    padding: 2rem;
}
</style>
