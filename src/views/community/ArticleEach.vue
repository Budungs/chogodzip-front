<template>
    <tr>
        <td style="width:5%; text-align:center;" >1</td>
        <td style="width:10%; text-align:center;">부동산</td>
        <td style="width:50%; text-align:center;"><a href="/communitydetail">세대수 적은 아파트는 왜 사면 안될까요?</a></td>
        <td class="truncate" style="text-align:center;">깨비글스</td>
        <td style="width:10%; text-align:center;">2024-09-26</td>
        <td style="width:15%; text-align:center;">71</td>
    </tr>                                                                                                                                                                                   
</template>

<script setup>
import { ref } from 'vue';

const iconClass = ref("far fa-heart");

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
