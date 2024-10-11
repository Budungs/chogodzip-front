<template>
    <tr>
        <td style="width:5%; text-align:center;" >{{ item.communityId }}</td>
        <td style="width:10%; text-align:center;">{{ getTagName(item.tag) }}</td>
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

const iconClass = ref("far fa-heart");

const props = defineProps({
    item: {
        type: Object,
        requried: true,
    }
})

//태그
const tagMapping = {
    'REPI': '부동산 정책/투자',
    'REHT': '부동산 핫이슈',
    'RERV': '부동산 후기',
    'CTRV': '계약/입주 후기',
    'ITRV': '인테리어 후기',
    'LNQS': '대출 질문',
    'LTQS': '분양/청약 질문'
};

const getTagName = (tag) => {
    return tagMapping[tag] || tag;
};

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
