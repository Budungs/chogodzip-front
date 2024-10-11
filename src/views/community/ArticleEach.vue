<template>
    <!-- 글 태그 필터링 -->
    <tr> 
        <td style="width:5%; text-align:center;" >{{ item.communityId }}</td>
        <td style="width:10%; text-align:center;" >{{ getTagName(item.tag) }}</td>
        <td style="width:50%; text-align:center;">
            <router-link :to="{ path: `/community/${item.communityId}` }" style="text-decoration: none;">{{ item.title }}</router-link>
        </td>
        <td class="truncate" style="text-align:center;">{{ item.nickname }}</td>
        <td style="width:10%; text-align:center;"> {{ new Date(item.createdAt).toISOString().slice(0, 10) }}</td>
        <td style="width:15%; text-align:center;">{{ item.views }}</td>
    </tr>                                                                                                                                                                                   
</template>

<script setup>
import { ref } from 'vue';
import { getTagName } from '@/modules/components/community/tags.js';

const iconClass = ref("far fa-heart");

const props = defineProps({
    item: {
        type: Object,
        requried: true,
    },
})
</script>

<style scoped>
td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

td.truncate {
    max-width: 200px;
}
</style>
