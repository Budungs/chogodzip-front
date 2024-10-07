<template>
    <div class="white-box p-5 mb-4">
        <div class="d-flex justify-content-center h4">
            <span>{{ cardData.roomAddrFl }}</span><span>다세대(빌라/연립)</span>
        </div>

        <!-- Conditionally render features based on parsed tags -->
        <div class="features d-flex justify-content-between">
            <div class="feature">
                <img :src="ApartmentIcon" alt="Loan Icon" />
                <span>{{ parsedTags.includes('개인화장실') ? '개인화장실' : '공용화장실' }}</span>
            </div>
            <div class="feature">
                <img :src="FoodIcon" height="45" width="45" alt="식사" />
                <span>{{ parsedTags.includes('식사제공') ? '식사제공' : '식사 미제공' }}</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Room Icon" />
                <span>{{ cardData.floor }}층</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Area Icon" />
                <span>방 {{ cardData.roomCnt }} 개</span>
            </div>
            <div class="feature">
                <img :src="ParkingIcon" alt="Parking Icon" />
                <span>{{ parsedTags.includes('주차') ? '주차가능' : '주차불가능' }}</span>
            </div>
            <div class="feature">
                <img :src="ToiletIcon" alt="Gender Icon" />
                <span>{{ genderType }}</span>
            </div>
        </div>

        <div class="description">
            <p>침대대출가능 모두가능 저융자 안전한방</p>
            <p>복층형 원룸 단독타입(사무 등록 저융자로 공감으로, 크지 않습니다)</p>
            <p>반려동물 협의 (고양이 가능, 장애있는 소형견입주 협의 가능)</p>
            <p>임대인 국세, 저융세 협박 확인 (쉽게 연락가능)</p>
            <p>임대차 보호 특별법에 의해 임차인 보호 특약 대상 많이 넣어드립니다</p>
            <p>훌륭한 전세시장은 침착히 보증보험 가입해서 저희와 보증금 안전하게 지키세요!</p>
            <div class="more-button main1 mt-2" type="button"><strong>소개 더보기</strong></div>
        </div>
    </div>
</template>

<script setup>
import ApartmentIcon from '@/assets/img/detail/Apartment.png';
import DepartmentIcon from '@/assets/img/detail/Department.png';
import ParkingIcon from '@/assets/img/detail/Parking.png';
import ToiletIcon from '@/assets/img/detail/Toilet.png';
import FoodIcon from '@/assets/img/detail/Food.png';
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
            return '남녀공용';
    }
});
</script>

<style scoped>
.main1 {
    color: #7747b5;
}

.features {
    padding: 1.5rem 1rem 1.5rem 1rem;
    border-top: solid 1px #d9d9d9;
    border-bottom: solid 1px #d9d9d9;
    margin: 3rem auto 3rem;
}

.features img {
    margin-right: 0.3rem;
}

.description {
    text-align: center;
}
</style>
