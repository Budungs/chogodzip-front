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
                                <td>{{ (cardData.PRICE_MIN === 0 || cardData.PRICE_MIN === null) && (cardData.PRICE_MAX === 0 || cardData.PRICE_MAX === null) ? '전세' : rent_type }}</td>
                            </tr>
                            <tr>
                                <th>보증금</th>
                                <td>{{ cardData.DEPOSIT_MIN }} ~ {{ cardData.DEPOSIT_MAX }}만원</td>
                            </tr>
                            <tr>
                                <th>월 이용료</th>
                                <td>{{ cardData.PRICE_MIN }} 만원 ~ {{ cardData.PRICE_MAX }} 만원</td>
                            </tr>
                            <tr>
                                <th>관리비</th>
                                <td>{{ cardData.MAINTENANCE_FEE ? cardData.MAINTENANCE_FEE+' 만원' : '없음' }} </td>
                            </tr>
                            <tr>
                                <th>해당 층</th>
                                <td>{{  FLOOR }}</td>
                            </tr>
                            <tr>
                                <th>방 구조</th>
                                <td>{{ ROOM_TYPE }}</td>
                            </tr>
                            <tr>
                                <th>방 수/욕실 수</th>
                                <td>{{ room_cnt }} / {{ toilet_cnt }}</td>
                            </tr>
                            <tr>
                                <th>전용/공급면적</th>
                                <td>{{ realsize ? realsize + '㎡' : '정보 없음' }} / {{ roomsize ? roomsize + '㎡' : '정보 없음' }}</td>
                            </tr>
                            <tr>
                                <th>주실 방향</th>
                                <td>{{ sun_dir }}</td>
                            </tr>
                            <tr>
                                <th>최소계약기간</th>
                                <td>{{ DURATION_MIN }}</td>
                            </tr>
                            <tr>
                                <th>입주가능일</th>
                                <td>{{ AVA_MOVIN_DATE }}</td>
                            </tr>
                            <tr>
                                <th>주차</th>
                                <td>{{ canParking }}</td>
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
                                <td>{{LOAN_ID}}</td>
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
                                <td>{{ formattedLifeFacilities}}</td>
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
                                <td>{{ NAME === 0 ? '정보 없음' : NAME + ' 호' }}</td>
                            </tr>
                            <tr>
                                <th>방 형태</th>
                                <td>{{ ROOM_TYPE }}</td>
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

console.log('adfadsf',props.cardData.priceMax);

// Parse private facilities and services
const parsedPrivateFacilities = computed(() => {
    return props.cardData.privateFacilities && props.cardData.privateFacilities !== 'null' ? props.cardData.privateFacilities.split('|') : [];
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