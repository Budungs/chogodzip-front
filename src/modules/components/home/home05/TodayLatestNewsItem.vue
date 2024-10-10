<template>
    <a :href="item.href" class="news-link-a" > 
        <div class="mb-3 d-flex flex-row">
            <div class="text-danger" style="min-width:70px">{{ item.category }}</div> 
            <div class="news-title">{{ item.title }}</div>
        </div>
    </a>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
.news-link-a {
    text-decoration: none; color: #3d3d3d;
}

.news-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
}
</style>