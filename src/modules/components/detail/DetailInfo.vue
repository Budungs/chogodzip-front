<template>
    <div class="white-box p-5 mb-4">
        <div class="d-flex justify-content-center h4">
            <span>{{ cardData.room.address }} {{ cardData.detailAddress }}</span>
        </div>

        <!-- Conditionally render features based on parsed facilities and services -->
        <div class="features d-flex justify-content-between">
            <div class="feature">
                <img :src="ApartmentIcon" alt="Loan Icon" />
                <span>{{ parsedPrivateFacilities.includes('개인화장실') ? '개인화장실' : '공용화장실' }}</span>
            </div>
            <div class="feature">
                <img :src="FoodIcon" height="45" width="45" alt="식사" />
                <span>{{ parsedServices.includes('식사제공') ? '식사제공' : '식사 미제공' }}</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Room Icon" />
                <span>{{ cardData.floor || 'N/A' }}층</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Area Icon" />
                <span>{{cardData.roomCnt || 'N/A'}}개</span>
            </div>
            <div class="feature">
                <img :src="ParkingIcon" alt="Parking Icon" />
                <span>{{ cardData.canParking ? '주차가능' : '주차불가능' }}</span>
            </div>
            <div class="feature">
                <img :src="ToiletIcon" alt="Gender Icon" />
                <span>{{ genderType }}</span>
            </div>
        </div>

        <div class="description">
            <p>{{ cardData.description }}</p>
            <!-- <div class="more-button main1 mt-2" type="button"><strong>소개 더보기</strong></div> -->
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
    },
    
});

// Parse private facilities and services from cardData
const parsedPrivateFacilities = computed(() => {
    return props.cardData.privateFacilities ? props.cardData.privateFacilities.split('|') : [];
});

const parsedServices = computed(() => {
    return props.cardData.services ? props.cardData.services.split('|') : [];
});

// Determine gender type based on genderLimit
const genderType = computed(() => {
    switch (props.cardData.genderLimit) {
        case 1:
            return '남성전용';
        case 2:
            return '여성전용';
        case 3:
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
