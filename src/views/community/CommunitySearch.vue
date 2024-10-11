<template>
    <div class="container">
        <br><br>
        <h1>커뮤니티</h1>
        <div class="dictionary-container">
            <form class="form-group" style="width:100%; height: 75px; display:flex; flex-direction:row; justify-content:center;">
                <!-- 분류 Dropdown -->
                <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
                    <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-sort-down me-2"></i>
                        <span class="dropdown-toggle-label">{{ getTagName(selectedOwner) }}</span>
                    </button>
                    <input type="hidden">
                    <ul class="dropdown-menu">
                        <li v-for="(key, idx) in Object.keys(tagMapping)" :key="idx">
                            <a href="#" class="dropdown-item" @click="selectOwner(key)">
                                <span class="dropdown-item-lab  el">{{ getTagName(key) }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 검색 인풋 -->
                <div class="input-group input-group-lg">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="공고 제목을 입력하세요" v-model="searchTitle">
                </div>
                <hr class="d-sm-none my-2">
        
                <hr class="d-sm-none my-2">
        
                <button type="button" class="btn btn-translucent-primary ms-auto" style="width:200px" @click="filterList">검색</button>
            </form>
            
            <!-- 게시글 건수, 조회 방식 select-->
            <div class="selector">
                <div class="howcnt-postview">
                    <!-- 한 번에 게시되는 게시글 Dropdown -->
                    <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
                        <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-sort-down me-2"></i>
                            <span class="dropdown-toggle-label">{{ viewArticleCnt }}건</span>
                        </button>
                        <input type="hidden">
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('10')">
                                    <span class="dropdown-item-lab  el">10건</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('20')">
                                    <span class="dropdown-item-label">20건</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('30')">
                                    <span class="dropdown-item-label">30건</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="howto-postview">
                    <!-- 게시글 조회 방식 Dropdown -->
                    <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
                        <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-sort-down me-2"></i>
                            <span class="dropdown-toggle-label">{{ viewArticleHowTo === 'latest' ? '최신순' : '조회순' }}</span>
                        </button>
                        <input type="hidden">
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleView('latest')">
                                    <span class="dropdown-item-label">최신순</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleView('views')">
                                    <span class="dropdown-item-label">조회순</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 게시글 수와 페이지 수 조회 -->
            <br>
            전체 <span style="color:#9D7AC3; font-weight: bold;">{{ filteredList.length }}</span> 건 <span style="color:#9D7AC3; font-weight: bold;">{{ currentPage }}</span>/ {{ totalPages }} 페이지
            
            <!-- 게시판 -->
            <br><br><br>
            <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th style="text-align:center;">번호</th>
                    <th style="text-align:center;">태그</th>
                    <th style="text-align:center;">제목</th>
                    <th style="text-align:center;">작성자</th>
                    <th style="text-align:center;">작성일</th>
                    <th style="text-align:center;">조회수</th>
                </tr>
                </thead>
                <tbody>
                    <h1 v-if="filteredList.length === 0" class="h3">데이터가 없습니다.</h1>
                    <ArticleEach v-for="(item, idx) in filteredList" :key="idx" :item="item" />
                </tbody>
            </table>
            </div>
            
            <!-- 검색 버튼 -->
            <div class="d-flex">
                <button type="button" class="btn btn-translucent-primary ms-auto" style="width:120px; margin-right: 70px;" @click="goToWritePage">글쓰기</button>
            </div>
            
            <!-- 페이지네이션 -->
            <div class="con-paging">
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:page="handlePageChange" />
            </div>

            <br>
        </div>
    </div>
    <br><br><br><br><br>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, getTransitionRawChildren } from 'vue';
import ArticleEach from './ArticleEach.vue';
import Pagination from '@/common/components/Pagination.vue';
import { getTagName, tagMapping } from '@/modules/components/community/tags.js';


const selectedOwner = ref('ALL'); // 드롭다운에서 선택한 값을 저장하는 상태
const searchTitle = ref(''); //검색어
const viewArticleCnt = ref('10'); //1페이지 표시 개수
const viewArticleHowTo = ref('latest'); //정렬 기준

const list = ref([]); //원본 데이터 리스트
const filteredList = ref([]); //필터링 데이터 리스트

// 선택된 태그로 업데이트하는 메소드
const selectOwner = (owner) => {
    selectedOwner.value = owner;
    filterList();
};

// 개수 변경에 따른 페이지 표시
const selectArticleCnt = (articleCnt) => {
    viewArticleCnt.value = articleCnt;
    countTotalPage();
};

// 기준별 정렬
const selectArticleView = (howToView) => {
    viewArticleHowTo.value = howToView;
    sortList();
};

// 데이터 조회 & 바인딩
const fetchCommunity = async () => {
    try {
        const res = await axios.get('/api/community/list');
        if(res.status === 200) {
            list.value = res.data;
            filteredList.value = res.data;
            countTotalPage(); //
        }
        
    } catch (err) {
        console.error('>> 데이터 조회 실패 (ToT) error:',err.message);
    }
}
onMounted(fetchCommunity);

const filterList = () => {
    if(searchTitle.value.trim().length == 1) {
        alert('검색어는 2글자 이상 입력해주세요.'); return;
    }

    filteredList.value = list.value.filter(item => {
        let isMatchedWithTag = selectedOwner.value === 'ALL' || selectedOwner.value === item.tag;
        let isContainWord = searchTitle.value.trim() === '' || item.title.toLowerCase().includes(searchTitle.value.toLowerCase());
        return isMatchedWithTag && isContainWord;
    });

    sortList();
    countTotalPage();
}

//데이터 정렬
const sortList = () => {
    if(viewArticleHowTo.value === 'latest') filteredList.value = filteredList.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    else filteredList.value = filteredList.value.sort((a, b) => b.views - a.views);
    countTotalPage();
}


// 페이지네이션 정보
const currentPage = ref(1); // 현재 게시글 페이지
const totalPages = ref(1);// 전체 게시글 페이지 수

//전체 페이지 계산
const countTotalPage = () => {
    totalPages.value = Math.ceil(filteredList.value.length / parseInt(viewArticleCnt.value));
}

// 페이지 변경 처리
const handlePageChange = (page) => {
    currentPage.value = page;
};

// 글쓰기 페이지로 이동
import { useRouter } from 'vue-router';
const router = useRouter();
function goToWritePage() {
  router.push('/community/new'); // '/communitywrite' 경로로 이동
}
</script>

<style scoped>
.container {
    background-color: #E6E6FA;
}
.dictionary-container {
    background-color: white;
    border: 2px solid #969696; /* 테두리 두께 2px, 회색 */
    border-radius: 10px; /* 모서리를 10px 둥글게 */
    padding: 20px; /* 내부 여백 */
}
.selector {
    display: grid; /* Grid 활성화 */
    grid-template-columns: auto auto; /* 두 개의 열 생성 */
    justify-content: end; /* 오른쪽 정렬 */
}
.howcnt-postview {
    margin-right: 30px;
    margin-top: 10px;
    border: 2px solid #969696; /* 두께 2px, 실선, 회색 */
    border-radius: 10px; /* 모서리 둥글게 */
}
.howto-postview {
    border: 2px solid #969696; /* 두께 2px, 실선, 회색 */
    border-radius: 10px; /* 모서리 둥글게 */
    margin-top: 10px;
}
.con-paging {
    width:100%; height:100px; display:flex; justify-content: center; align-items: end;
}
</style>