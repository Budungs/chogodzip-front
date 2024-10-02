<template>
    <div class="gray-container">
        <div class="container">
            <RoomTable />
        </div>
    </div>
</template>

<script>
import RoomTable from '@/modules/components/detail/table/RoomTable.vue';

export default {
    components: { RoomTable }
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