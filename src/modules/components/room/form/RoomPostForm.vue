<template>
    <BasicInfo />
    <LoanInfo />
    <FacilitiesInfo />
    <BuildingInfo />

    <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-translucent-accent w-25" @click="store.submitForm">매물 등록</button>
    </div>
</template>

<script setup>
import BasicInfo from './BasicInfo.vue';
import BuildingInfo from './BuildingInfo.vue';
import FacilitiesInfo from './FacilitiesInfo.vue';
import LoanInfo from './LoanInfo.vue';

import { usePostRoomStore } from '@/modules/stores/postRoom';
const store = usePostRoomStore();
</script>