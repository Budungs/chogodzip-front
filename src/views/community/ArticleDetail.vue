<template>
    <div class="outer-container py-5">
        <div class="container py-5 px-5 rounded box-shadow">
            <!-- 게시글 제목 -->
             <div class="w-100 mb-5">
                <h1 class="h2" style="color: var(--grayTitle)">{{ post.title }}</h1>
             </div>
        
            <hr>

            <!-- 게시글 내용 -->
            <div class="content my-5 fs-lg" v-html="post.content"></div>
        </div>
    </div>
</template>

<style scoped>
.attach {
    font-size: 0.8rem;
    cursor: pointer;
}
.content {
    white-space: pre-line;
}
.outer-container {
    background-color:#F2ECF9;
}
.container {
    background-color:white;
}
.con-paging {
    width:100%; height:100px; display:flex; justify-content: center; align-items: end;
}
</style>

<script setup>
import { useRouter, useRoute } from 'vue-router'; // Vue Router를 불러옵니다.

import axios from 'axios';
import { onMounted, ref } from 'vue'; // ref를 vue에서 임포트합니다.

//상세글 데이터 조회
const route = useRoute();

const post = ref({});
const fetchDetail = async () => {
    try {
        const res = await axios.get(`/api/community/articles/${route.params.id}`, post);

        if(res.status === 200) {
            post.value = res.data;
            console.log(post.value);
        }   
    } catch (err) {
        console.error('>> 상세글 조회 실패 (T>T) ', err.message);
    }
}
onMounted(fetchDetail);


const router = useRouter(); // router 인스턴스를 가져옵니다.
const goToMainPage = () => {
  router.push('/community'); // /communitymain 경로로 이동합니다.
};
</script>
