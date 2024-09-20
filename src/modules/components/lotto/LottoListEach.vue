<template>
    <tr>
        <td style="width:5%" @click="changeIcon">
            <i :class="iconClass" style="color: var(--main2)"/>
        </td>
        <td style="width:5%">공공</td>
        <td style="width:10%">청년안심주택</td>
        <td style="width:5%">충청북도</td>
        <td class="truncate">부천두산위브트레지움 1단지(부천약대1) 공가세대 일반매각 공고</td>
        <td style="width:10%"><span style="color: var(--caution); font-weight:bold">공고중</span></td>
        <td style="width:15%">2024.10.25</td>
    </tr>
</template>

<script setup>
import { ref } from 'vue';

const iconClass = ref("far fa-heart");

const changeIcon = () => {
  // 현재 아이콘 상태를 토글
  if (iconClass.value === "far fa-heart") {
    iconClass.value = "fas fa-heart";
  } else {
    iconClass.value = "far fa-heart";
  }
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
