<template>
    <div class="outer-container">
        <br><br><br>
        <div class="container">
        <!-- 게시글 제목 -->
        <h1 style="margin-top:30px;">{{ post.title }}</h1>
    
        <!-- 게시글 작성자 및 작성 시간 -->
        <div class="my-3 d-flex justify-content-between">
            <div>
                <i class="fa-solid fa-user" style="margin-top:30px;"></i>
                {{ post.nickname }}
            </div>
            <div>
                <i class="fa-regular fa-clock"></i>
                {{ formatDate(post.createdAt) }}
            </div>
        </div>
    
        <hr />  
    
        <!-- 게시글 내용 -->
        <div class="content" v-html="post.content"></div>
    
        <!-- 목록 및 수정, 삭제 버튼 -->
        <div class="my-5">
            <button class="btn btn-primary me-2" @click="goToMainPage">
                <i class="fa-solid fa-list"></i> 목록
            </button>
            <!-- 수정, 삭제 버튼 -->
            <button class="btn btn-primary me-2">
                <i class="fa-regular fa-pen-to-square"></i> 수정
            </button>
            <button class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i> 삭제
            </button>
        </div>
    
        <!-- 댓글 입력 -->
        <div class="row mt-2">
            <div class="col-11">
                <label class="form-label">댓글</label>
                <input type="text" class="form-control" placeholder="내용을 입력하세요.">
            </div>
            <div class="col-1">
                <label class="form-label">&nbsp;</label>
                <button class="form-control btn btn-primary">작성</button>
            </div>
        </div>
    
        <!-- 댓글 목록 -->
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        
        <!-- 페이지네이션 -->
        <div class="con-paging">
            <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:page="handlePageChange" />
        </div>

        </div>
        <br><br><br>
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
    border: 1px solid #ccc; /* 테두리 색상 및 두께 설정 */
    border-radius: 15px;    /* 둥글게 만들기, 값은 원하는 대로 조절 가능 */
    padding: 50px;          /* 테두리 안쪽에 여백을 추가 */
}
.con-paging {
    width:100%; height:100px; display:flex; justify-content: center; align-items: end;
}
</style>

<script setup>
import { useRouter, useRoute } from 'vue-router'; // Vue Router를 불러옵니다.
import Comment from '@/views/community/Comment.vue';
import Pagination from '@/common/components/Pagination.vue'; // Pagination 컴포넌트 경로 수정 필요

import { onMounted, ref } from 'vue'; // ref를 vue에서 임포트합니다.
import axios from 'axios';
import { formatDate } from '@/utils/timestamp.js';


//상세글 데이터 조회
const route = useRoute();

const post = ref({});
const fetchDetail = async () => {
    try {
        const res = await axios.get(`/api/community/${route.params.id}`, post);

        if(res.status === 200) {
            post.value = res.data;
        }   
    } catch (err) {
        console.error('>> 상세글 조회 실패 (T>T) ', err.message);
    }
}

onMounted(fetchDetail);


const router = useRouter(); // router 인스턴스를 가져옵니다.

const goToMainPage = () => {
  router.push('/communitymain'); // /communitymain 경로로 이동합니다.
};

// 페이지네이션 정보
const currentPage = ref(1); // 현재 게시글 페이지
const totalPages = 10; // 전체 게시글 페이지 수

// 페이지 변경 처리
const handlePageChange = (page) => {
    currentPage.value = page;
};
</script>
