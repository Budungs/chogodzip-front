<template>
    <div class="col-sm-6 mb-3 w-100">
        <h2 class="form-label pt-4 pb-0">가격</h2>

        <!-- 월세 -->
        <div v-if="rentalType === 'monthly'" class="form-label pt-3 pb-1">임대 가격(1개월)<span class="text-danger">*</span></div>
        <div v-if="rentalType === 'monthly'" class="d-flex align-items-center pb-4">
            <div class="w-50 pe-2">
                <div class="input-group">
                    <input class="form-control range-slider-value-min" type="text">
                    <span class="input-group-text fs-base">만원</span>
                </div>
            </div>
            <div class="text-muted">&mdash;</div>
            <div class="w-50 ps-2">
                <div class="input-group">
                    <input class="form-control range-slider-value-max" type="text">
                    <span class="input-group-text fs-base">만원</span>
                </div>
            </div>
        </div>

        <!-- 보증금 -->
        <div class="form-label pt-3 pb-1">보증금<span class="text-danger">*</span></div>
        <div class="d-flex align-items-center g-2">
            <div class="w-50 pe-2">
                <div class="input-group">
                    <input class="form-control range-slider-value-min" type="text" v-model="depositFeeMin">
                    <span class="input-group-text fs-base">만원</span>
                </div>
            </div>
            <div class="text-muted">&mdash;</div>
            <div class="w-50 ps-2">
                <div class="input-group">
                    <input class="form-control range-slider-value-max" type="text" v-model="depositFeeMax">
                    <span class="input-group-text fs-base">만원</span>
                </div>
            </div>
        </div>
        <div class="form-check d-flex justify-content-end pt-2 fs-sm">
            <input class="form-check-input" type="checkbox" id="no-deposit" name="no-deposit-fee" v-model="isNoDepositFee">
            <label class="form-check-label px-2" for="no-deposit-fee">보증금 없음</label>
        </div>

        <!-- 관리비 -->
        <div class="form-label pt-3 pb-1">관리비<span class="text-danger">*</span></div>
            <div class="d-flex align-items-center g-2">
                <div class="w-50 pe-2">
                    <div class="input-group">
                        <input class="form-control range-slider-value-min" type="text" v-model="maintenanceFeeMin" :disabled="isNoMaintenanceFee">
                        <span class="input-group-text fs-base">만원</span>
                    </div>
                </div>
                <div class="text-muted">&mdash;</div>
                <div class="w-50 ps-2">
                    <div class="input-group">
                        <input class="form-control range-slider-value-max" type="text" v-model="maintenanceFeeMax" :disabled="isNoMaintenanceFee">
                        <span class="input-group-text fs-base">만원</span>
                    </div>
                </div>
            </div>
            <div class="form-check d-flex justify-content-end pt-2 fs-sm">
                <input class="form-check-input" type="checkbox" id="no-maintenance-fee" v-model="isNoMaintenanceFee">
                <label class="form-check-label px-2" for="no-maintenance-fee">관리비 없음</label>
            </div>
        </div>
</template>

<script setup>
import { ref } from 'vue';

// 보증금
const depositFeeMin = ref('');
const depositFeeMax = ref('');
const isNoDepositFee = ref(false);

// 관리비
const maintenanceFeeMin = ref('');
const maintenanceFeeMax = ref('');
const isNoMaintenanceFee = ref(false);

//월세or전세
const props = defineProps({
    rentalType: {
        type: String,
        required: true,
    },
})
</script>