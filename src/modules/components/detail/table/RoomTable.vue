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
                                <td>{{ rentTypeLabel }}</td>
                            </tr>
                            <tr>
                                <th>보증금</th>
                                <td>{{ cardData.depositMin ? cardData.depositMin + ' 만원 ~ ' + cardData.depositMax + '만원' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>월 이용료</th>
                                <td>{{ cardData.priceMin? cardData.priceMin+ ' 만원 ~ ' + cardData.priceMin + ' 만원' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>관리비</th>
                                <td>{{ cardData.maintenanceFee ? cardData.maintenanceFee + ' 만원' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>해당 층</th>
                                <td>{{ cardData.floor ? cardData.floor: '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>방 구조</th>
                                <td>{{ cardData.roomType ? cardData.roomType : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>방 수/욕실 수</th>
                                <td>{{ cardData.room_cnt ? cardData.room_cnt : '정보 없음' }} / {{ cardData.toilet_cnt ? cardData.toilet_cnt : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>전용/공급면적</th>
                                <td>{{ cardData.realSize ? cardData.realSize + '㎡' : '정보 없음' }} / {{ cardData.roomSize ? cardData.roomSize + '㎡' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>주실 방향</th>
                                <td>{{ cardData.sunDir ? cardData.sunDir : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>최소계약기간</th>
                                <td>{{ cardData.durationMin ? cardData.durationMin + '일' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>입주가능일</th>
                                <td>{{ cardData.AVA_MOVIN_DATE ? cardData.AVA_MOVIN_DATE : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>주차</th>
                                <td>{{ canParkingLabel === 0 ? '주차 가능' : '주차 불가능' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="table2">
                <div class="info-container table2">
                    <h4>대출종류</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>가능한 대출</th>
                                <td>{{ cardData.loanId ? cardData.loanId : '정보 없음' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="info-container table2">
                    <h4>시설정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>난방시설</th>
                                <td>{{ cardData.facilityHeating ? cardData.facilityHeating : '난방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>냉방시설</th>
                                <td>{{ cardData.facilityCooling ? cardData.facilityCooling : '냉방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>생활시설</th>
                                <td>{{ formattedLifeFacilities }}</td>
                            </tr>
                            <tr>
                                <th>안전시설</th>
                                <td>{{ formattedSecurityFacilities }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="info-container table2">
                    <h4>건물정보</h4>
                    <table>
                        <tbody>
                            <tr>
                                <th>호수</th>
                                <td>{{ cardData.NAME ? cardData.NAME + ' 호' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>방 형태</th>
                                <td>{{ cardData.ROOM_TYPE ? cardData.ROOM_TYPE : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>엘리베이터</th>
                                <td>{{ hasElevatorLabel }}</td>
                            </tr>
                            <tr>
                                <th>건물 형태</th>
                                <td>{{ buildingTypeLabel }}</td>
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

const rentTypeLabel = computed(() => {
    return (props.cardData.PRICE_MIN === 0 || props.cardData.PRICE_MIN === null) && 
           (props.cardData.PRICE_MAX === 0 || props.cardData.PRICE_MAX === null) 
           ? '전세' : '월세';
});

const formattedLifeFacilities = computed(() => {
    return props.cardData.facilityLife && props.cardData.facilityLife !== 'null' ? props.cardData.facilityLife.split('|').join(', ') : '없음';
});

const formattedSecurityFacilities = computed(() => {
    return props.cardData.facilitySecurity && props.cardData.facilitySecurity !== 'null' ? props.cardData.facilitySecurity.split('|').join(', ') : '없음';
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
    return props.cardData.canParking === 0 ? '불가능' : '가능';
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
    border-bottom: 1px solid #cdcad45f
}

.info-container {
    padding: 2rem;
}
</style>
