<template>
    <div class="gray-container">
        <div class="container">
            <GosiwonTable />
        </div>
    </div>
</template>

<script>
import GosiwonTable from '@/modules/components/detail/table/GosiwonTable.vue';

export default {
    components: { GosiwonTable }
}
</script>

<style scoped>
.gray-container {
    background: #EDEDED;
    margin-top: 5rem;
    padding: 3rem;
    padding-top: 7rem;
    padding-bottom: 7rem;
}

.white-box {
    background: white;
}
</style>