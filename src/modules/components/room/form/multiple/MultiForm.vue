<template>
    <MultiBasicInfo :category="category" />
    <MultiFacilitiesInfo />
    <BuildingInfo />
</template>

<script setup>
import { ref } from 'vue';

import BuildingInfo from '../BuildingInfo.vue';
import MultiBasicInfo from './MultiBasicInfo.vue';
import MultiFacilitiesInfo from './MultiFacilitiesInfo.vue';

const category = ref('');
</script>