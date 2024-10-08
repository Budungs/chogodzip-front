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
                                <td>{{ cardData.maintainCost ? cardData.maintainCost : '없음' }} 만원</td>
                            </tr>
                            <tr>
                                <th>이용기간<br />(계약기간)</th>
                                <td>제한없음</td>
                            </tr>
                            <tr>
                                <th>이용연령</th>
                                <td>연령제한 없음</td>
                            </tr>
                            <tr>
                                <th>개인화장실 여부</th>
                                <td>{{ parsedTags.includes('개인화장실') ? '있음' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>개인샤워부스 여부</th>
                                <td>{{ parsedTags.includes('개인샤워부스') ? '있음' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>남녀구분</th>
                                <td>{{ genderType }}</td>
                            </tr>
                            <tr>
                                <th>기타사항</th>
                                <td>{{ parsedTags.includes('주소이전') ? '주소이전 가능' : '주소이전 불가능' }}</td>
                            </tr>
                            <tr>
                                <th>제공 서비스</th>
                                <td>{{ parsedTags.includes('청소업체') ? '청소업체' : '청소서비스 없음' }}</td>
                            </tr>
                            <tr>
                                <th>외국어 응대</th>
                                <td>{{ parsedTags.includes('외국어 응대') ? '영어, 일본어' : '불가능' }}</td>
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
                                <td>{{ parsedTags.includes('난방시설') ? '중앙난방' : '난방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>세탁시설</th>
                                <td>{{ parsedTags.includes('세탁시설') ? '세탁기, 건조기, 다리미' : '세탁시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>주방시설</th>
                                <td>{{ parsedTags.includes('주방시설') ? '전자레인지, 전기밥솥, 정수기, 가스레인지' : '주방시설 없음' }}</td>
                            </tr>
                            <tr>
                                <th>생활시설</th>
                                <td>{{ parsedTags.includes('생활시설') ? '제공' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>안전시설</th>
                                <td>{{ parsedTags.includes('안전시설') ? '제공' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>별도 전용공간</th>
                                <td>{{ parsedTags.includes('전용공간') ? '제공' : '없음' }}</td>
                            </tr>
                            <tr>
                                <th>제공비품</th>
                                <td>{{ parsedTags.includes('제공비품') ? '제공' : '없음' }}</td>
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
                                <td>{{ cardData.buildingType ? cardData.buildingType : '상가건물' }}</td>
                            </tr>
                            <tr>
                                <th>주차</th>
                                <td>{{ parsedTags.includes('주차') ? '가능' : '불가능' }}</td>
                            </tr>
                            <tr>
                                <th>엘레베이터</th>
                                <td>{{ parsedTags.includes('엘레베이터') ? '있음' : '없음' }}</td>
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

// Parse tags from cardData
const parsedTags = computed(() => {
    return props.cardData.tags ? props.cardData.tags.split('|') : [];
});

// Determine gender type based on genderCd
const genderType = computed(() => {
    switch (props.cardData.genderCd) {
        case 'GENDR00002':
            return '남성전용';
        case 'GENDR00003':
            return '여성전용';
        case 'GENDR00004':
            return '남녀분리';
        default:
            return '성별무관';
    }
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
