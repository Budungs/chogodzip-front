<template>
    <MultiBasicInfo :category="category" />
    <LoanInfo :category="category" />
    <MultiFacilitiesInfo />
    <BuildingInfo />
</template>

<script setup>
import BuildingInfo from '../BuildingInfo.vue';
import MultiBasicInfo from './MultiBasicInfo.vue';
import LoanInfo from '../LoanInfo.vue';
import MultiFacilitiesInfo from './MultiFacilitiesInfo.vue';

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
})
</script>