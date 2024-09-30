<template>
    <div>
        <SearchHouse />
        <div class="container">
            <LikeRegionState />
        </div>
        <LikeRegionLatest />
    </div>
</template>

<script setup>
import LikeRegionLatest from '@/modules/components/home/LikeRegionLatest.vue';
import LikeRegionState from '@/modules/components/home/LikeRegionState.vue';
import SearchHouse from '@/modules/components/home/SearchHouse.vue';
</script>

<style scoped> 
</style>