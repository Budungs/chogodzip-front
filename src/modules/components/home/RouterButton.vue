<template>
        <div class="w-100 h-100 mt-2 d-flex flex-column justify-content-center align-items-center">
            <a :href="hrefUrl"  class="d-flex flex-column router-to-finding-rooms page-link justify-content-center align-items-center">
                
                <div class="router-img-for-finding-rooms card bg-size-cover bg-position-center border-0 rounded-circle overflow-hidden shadow"
                :style="{ backgroundImage: `url(src/assets/images/icons/${backgroundImage}.jpg)` }"></div>
                <div class="md-5 mt-3 h-100 h6">{{ destination }}</div>
            </a>
        </div>
</template>

<style scoped>
.router-img-for-finding-rooms {
    height: 15vw; width: 15vw; max-width: 150px; max-height: 150px;
}
</style>

<script setup>
const props = defineProps({
    hrefUrl: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    backgroundImage: {
        type: String,
        required: true,
    }
})
</script>