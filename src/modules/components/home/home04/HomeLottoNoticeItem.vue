<template>
    <div class="card-body p-lg-4" >
        <p class="lead mb-3" v-for="(item, idx) in noticeItems" :key="idx">
            <span class="home-lottos-news-type me-4">{{ item.type }}</span> 
            <a :href="item.href"> {{ item.content }} </a>
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
  noticeItems: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.lead {
    white-space: nowrap;  
    overflow: hidden;    
    text-overflow: ellipsis;
}

.lead > a {
    text-decoration: none;
    color: #3d3d3d;
}

.home-lottos-news-type {
    color: #0055A2;
    font-weight:bold;
}
</style>