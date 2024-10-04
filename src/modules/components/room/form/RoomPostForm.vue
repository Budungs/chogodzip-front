<template>
    <BasicInfo :category="category" />
    <LoanInfo :category="category" />
    <FacilitiesInfo />
    <BuildingInfo />
</template>

<script setup>
import BasicInfo from './BasicInfo.vue';
import BuildingInfo from './BuildingInfo.vue';
import FacilitiesInfo from './FacilitiesInfo.vue';
import LoanInfo from './LoanInfo.vue';


const props = defineProps({
    category: {
        type: String,
        required: true,
    },
})
</script>