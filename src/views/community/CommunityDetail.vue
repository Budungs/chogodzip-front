<template>
    <div class="outer-container py-5">
        <div class="container py-5 px-5 rounded box-shadow">
            <!-- 게시글 제목 -->
             <div class="w-100 mb-5">
                <span class="mb-3" :class="matchTagStyle(post.tag)" style="padding:1% 1.5%; font-size: 1rem">{{ getTagName(post.tag) }}</span> 
                <h1 class="h2" style="color: var(--grayTitle)">{{ post.title }}</h1>
             </div>
        
            <!-- 게시글 작성자 및 작성 시간 -->
            <div class="d-flex justify-content-between gap-5">
                <p style="color:var(--gray1)">
                    <i class="fa-solid fa-user me-2"></i>
                    {{ post.nickname }}
                </p>
                <p style="color:var(--gray1)">{{ formatDate(post.createdAt) }}</p>
            </div>
        
            <hr>

            <!-- 게시글 내용 -->
            <div class="content my-5 fs-lg" v-html="post.content"></div>
        
            <!-- 목록 및 수정, 삭제 버튼 -->
            <div class="d-flex justify-content-end my-5">
                <button class="btn btn-light-primary btn-icon shadow-sm me-2" @click="goToMainPage">
                    <i class="fa-solid fa-list"></i>
                </button>
                <!-- 수정, 삭제 버튼 -->
                <button v-if="id !== null && id === post.memberId" class="btn btn-secondary btn-icon me-2" @click="goToModifyPage">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button v-if="id !== null && id === post.memberId" class="btn btn-outline-danger btn-icon" @click="deleteCommunity">
                    <i class="fa-solid fa-trash-can"></i>
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
import Comment from '@/views/community/Comment.vue';
import Pagination from '@/common/components/Pagination.vue'; // Pagination 컴포넌트 경로 수정 필요

import axios from 'axios';
import { onMounted, ref } from 'vue'; // ref를 vue에서 임포트합니다.
import { formatDate } from '@/utils/timestamp.js';
import { getTagName, matchTagStyle } from '@/modules/components/community/tags.js';

import { useAuthStore } from '@/stores/auth';
const { id } = useAuthStore(); //현재 로그인한 아이디

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

const deleteCommunity = async () => {
    try {
        const res = await axios.delete(`/api/community/${route.params.id}`);
        if(res.status === 200) goToMainPage();

    } catch (err) {
        console.error('>> 커뮤니티 삭제 실패 (T>T) ', err.message);
    }
}


const router = useRouter(); // router 인스턴스를 가져옵니다.
const goToMainPage = () => {
  router.push('/community'); // /communitymain 경로로 이동합니다.
};
const goToModifyPage = () => {
    localStorage.setItem('title', post.value.title);
    localStorage.setItem('content', post.value.content);
    localStorage.setItem('tag', post.value.tag);
    localStorage.setItem('pics', post.value.pics);
    
    router.push(`/community/${route.params.id}/modify`);
}

// 페이지네이션 정보
const currentPage = ref(1); // 현재 게시글 페이지
const totalPages = 10; // 전체 게시글 페이지 수

// 페이지 변경 처리
const handlePageChange = (page) => {
    currentPage.value = page;
};
</script>
