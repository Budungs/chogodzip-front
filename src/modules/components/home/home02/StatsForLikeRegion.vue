<template>
    <div class="justify-content-around">
        <h4 class="pt-0 pb-0" style="color:var(--main2)">{{ buildingType }}</h4>
        <div>
            <h6 class="d-flex mb-0 align-items-center" style="color:white"><span class="me-3" style="color:yellow">전세</span> 전월대비 
                <span class="badge rounded-pill bg-dark px-2 mx-3" style="font-size: 0.625rem; min-width: 3vw; text-align: left">{{ changeRateOfJeonse >= 0 ? '🔺' : '🔻' }} {{ Math.abs(changeRateOfJeonse) }}</span></h6>
            <h6 class="d-flex mb-0 align-items-center" style="color:white"><span class="me-3" style="color:yellow">월세</span> 전월대비 
                <span class="badge rounded-pill bg-dark px-2 mx-3" style="font-size: 0.625rem; min-width: 3vw; text-align: left">{{ changeRateOfRent >= 0 ? '🔺' : '🔻' }} {{ Math.abs(changeRateOfRent) }}</span></h6>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    buildingType: {
        type: String,
        required: true,
    },
    changeRateOfJeonse: {
        type: String,
        required: true,
    },
    changeRateOfRent: {
        type: String,
        required: true,
    },
})

const changeRateOfJeonse = parseFloat(props.changeRateOfJeonse);
const changeRateOfRent = parseFloat(props.changeRateOfRent);
</script>