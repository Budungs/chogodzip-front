<template>
    <!-- 제목-->
    <div class="mb-3">
        <label class="form-label fw-bold" for="ap-title">이름<span class="text-danger">*</span></label>
        <input class="form-control" type="text" id="ap-title" required>
    </div>

    <!-- 주소 -->
    <div class="mb-3 pb-3">
        <label class="form-label fw-bold" for="ap-title">주소<span class="text-danger">*</span></label>
        <AddressAPI />
    </div>
</template>

<script setup>
import AddressAPI from '@/common/components/AddressAPI.vue';
</script>