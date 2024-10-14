<template>
    <!-- 글 태그 필터링 -->
    <tr> 
        <td style="width:3%; text-align: center;" >{{ item.communityId }}</td>
        <!-- <td style="width:10%; " >{{ getTagName(item.tag) }}</td> -->
        <td style="width:5%;"> <span :class="matchTagStyle(item.tag)">{{ getTagName(item.tag) }}</span> </td>
        <td style="width:62%;">
            <router-link :to="{ path: `/community/${item.communityId}` }" style="text-decoration: none; color:var(--grayTitle)" >{{ item.title }}</router-link>
        </td>
        <td class="truncate" style="width:10%; text-align: center;">{{ item.nickname }}</td>
        <td style="width:10%; text-align: center;"> {{ new Date(item.createdAt).toISOString().slice(0, 10) }}</td>
        <td style="width:10%; text-align: center;">{{ item.views }}</td>
    </tr>                                                                                                                                                                                   
</template>

<script setup>
import { ref } from 'vue';
import { getTagName, matchTagStyle } from '@/modules/components/community/tags.js';
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
