<template>
    <a :href="item.href" class="news-link-a"> 
        <p class="mb-3">
            <span class="me-3">{{ item.category }}</span> {{ item.title }} 
        </p>
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

.news-link-a > p {
    white-space: nowrap;  
    overflow: hidden;    
    text-overflow: ellipsis;
}

.news-link-a > p > span {
    color: var(--caution);
}
</style>