<template>
    <div class="row white-box" style="margin: auto; width: 100%;">
        <div class="col-md-6">
            <div class="table1">
                <div class="info-container">
                    <h4>이용정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>보증금</th>
                                <td>{{ cardData.priceMin }} ~ {{ cardData.priceMax }}만원</td>
                            </tr>
                            <tr>
                                <th>월 이용료</th>
                                <td>{{ cardData.depositMin }} 만원 ~ {{ cardData.depositMax }} 만원</td>
                            </tr>
                            <tr>
                                <th>관리비</th>
                                <td>{{ cardData.maintenanceFee ? cardData.maintenanceFee : '없음' }} 만원</td>
                            </tr>
                            <tr>
                                <th>이용기간<br />(계약기간)</th>
                                <td>제한없음</td>
                            </tr>
                            <tr>
                                <th>이용연령</th>
                                <td>{{ cardData.ageMin && cardData.ageMax ? `${cardData.ageMin} ~ ${cardData.ageMax}세` : '연령제한 없음' }}</td>
                            </tr>
                            <tr>
                                <th>개인화장실 여부</th>
                                <td>{{ parsedPrivateFacilities.includes('개인화장실') ? '있음' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>개인샤워부스 여부</th>
                                <td>{{ parsedPrivateFacilities.includes('개인샤워실') ? '있음' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>남녀구분</th>
                                <td>{{ genderType }}</td>
                            </tr>
                            <tr>
                                <th>기타사항</th>
                                <td>{{ cardData.etc ? cardData.etc : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>제공 서비스</th>
                                <td>{{ parsedServices.includes('식사제공') ? '식사제공' : '식사 미제공' }}</td>
                            </tr>
                            <tr>
                                <th>외국어 응대</th>
                                <td>{{ cardData.languages ? cardData.languages : '불가능' }}</td>
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
                                <td>{{ cardData.facilityLife.includes('세탁기') ? '세탁기, 건조기' : '세탁시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>주방시설</th>
                                <td>{{ cardData.facilityLife.includes('전자레인지') ? '전자레인지, 전기밥솥' : '주방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>생활시설</th>
                                <td>{{ formattedLifeFacilities}}</td>
                            </tr>
                            <tr>
                                <th>안전시설</th>
                                <td>{{ formattedSecurityFacilities }}</td>
                            </tr>
                            <tr>
                                <th>별도 전용공간</th>
                                <td>{{ cardData.facilityLife.includes('전용공간') ? '제공' : '없음' }}</td>
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
                                <th>건물형태</th>
                                <td>{{ buildingTypeLabel }}</td>
                            </tr>
                            <tr>
                                <th>주차</th>
                                <td>{{ canParkingLabel }}</td>
                            </tr>
                            <tr>
                                <th>엘리베이터</th>
                                <td>{{hasElevatorLabel }}</td>
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

// Parse private facilities and services
const parsedPrivateFacilities = computed(() => {
    return props.cardData.privateFacilities ? props.cardData.privateFacilities.split('|') : [];
});

const parsedServices = computed(() => {
    return props.cardData.services ? props.cardData.services.split('|') : [];
});

const formattedLifeFacilities = computed(() => {
    return props.cardData.facilityLife ? props.cardData.facilityLife.split('|').join(', ') : '없음';
});

const formattedSecurityFacilities = computed(() => {
    return props.cardData.facilitySecurity ? props.cardData.facilitySecurity.split('|').join(', ') : '없음';
});

// Determine gender type based on genderLimit
const genderType = computed(() => {
    switch (props.cardData.genderLimit) {
        case 0:
            return '성별 무관';
        case 1:
            return '남녀 분리';
        case 2:
            return '여성 전용';
        case 3:
            return '남성 전용';
        default:
            return '성별무관';
    }
});

const buildingTypeLabel = computed(() => {
    switch (props.cardData.buildingType) {
        case 0:
            return '상가건물';
        case 1:
            return '공동주택';
        case 2:
            return '단독주택';   
        default:
            return '상가건물';
    }
});

const canParkingLabel = computed(() => {
    return props.cardData.canParking === 0 ? '가능' : '불가능';
});

const hasElevatorLabel = computed(() => {
    return props.cardData.hasElevator === 0 ? '없음' : '있음';
})
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
