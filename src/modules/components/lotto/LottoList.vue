<template>
    <div class="table-responsive">
    <table class="table table-hover">
        <thead>
        <tr>
            <th>관심</th>
            <th>주관</th>
            <th>분류</th>
            <th>지역</th>
            <th>공고제목</th>
            <th>상태</th>
            <th>발표일</th>
        </tr>
        </thead>
        <tbody>
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
            <LottoListEach />
        </tbody>
    </table>
    </div>
</template>

<script setup>
import LottoListEach from './LottoListEach.vue';
</script>
