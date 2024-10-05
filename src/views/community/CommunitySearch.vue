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
                        <span class="dropdown-toggle-label">{{ selectedOwner }}</span>
                    </button>
                    <input type="hidden">
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#" class="dropdown-item" @click="selectOwner('전체')">
                                <span class="dropdown-item-lab  el">전체</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item" @click="selectOwner('공공')">
                                <span class="dropdown-item-label">공공</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="dropdown-item" @click="selectOwner('민간')">
                                <span class="dropdown-item-label">민간</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 검색 인풋 -->
                <div class="input-group input-group-lg">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="공고 제목을 입력하세요">
                </div>
                <hr class="d-sm-none my-2">
        
                <hr class="d-sm-none my-2">
        
                <button type="button" class="btn btn-translucent-primary ms-auto" style="width:200px">검색</button>
            </form>
            
            <!-- 게시글 건수, 조회 방식 select-->
            <div class="selector">
                <div class="howcnt-postview">
                    <!-- 한 번에 게시되는 게시글 Dropdown -->
                    <div class="dropdown w-sm-20 border-end-md" data-bs-toggle="select">
                        <button class="btn btn-link" type="button" data-bs-toggle="dropdown">
                            <i class="fas fa-sort-down me-2"></i>
                            <span class="dropdown-toggle-label">{{ viewArticleCnt }}</span>
                        </button>
                        <input type="hidden">
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('10건')">
                                    <span class="dropdown-item-lab  el">10건</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('20건')">
                                    <span class="dropdown-item-label">20건</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleCnt('30건')">
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
                            <span class="dropdown-toggle-label">{{ viewArticleHowTo }}</span>
                        </button>
                        <input type="hidden">
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleView('최신순')">
                                    <span class="dropdown-item-lab  el">최신순</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleView('조회순')">
                                    <span class="dropdown-item-label">조회순</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item" @click="selectArticleView('제목순')">
                                    <span class="dropdown-item-label">제목순</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 게시글 수와 페이지 수 조회 -->
            <br>
            전체 <span style="color:#9D7AC3; font-weight: bold;">1020</span> 건 <span style="color:#9D7AC3; font-weight: bold;">1</span>/N 페이지
            
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
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
                    <ArticleEach />
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
import { ref, computed } from 'vue';
import ArticleEach from './ArticleEach.vue';
import Pagination from '@/common/components/Pagination.vue';

// 드롭다운에서 선택한 값을 저장하는 상태
const selectedOwner = ref('분류');
const viewArticleCnt = ref('10건');
const viewArticleHowTo = ref('최신순');

// 선택된 값을 업데이트하는 메소드
const selectOwner = (owner) => {
    selectedOwner.value = owner;
    selectedCategory.value = '분류'; // 주관 변경 시 분류 초기화
};

const selectArticleCnt = (articleCnt) => {
    viewArticleCnt.value = articleCnt;
};
const selectArticleView = (howToView) => {
    viewArticleHowTo.value = howToView;
};

// 게시글 더미 데이터
const articles = ref([
    {
        bno: 1,
        type: '부동산',
        title: '세대수 적은 아파트는 왜 사면 안될까요?',
        memberName: '깨비글스',
        memberId: 'kbg123',
        regDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2달 전
        readCount: 71
    },
    {
        bno: 2,
        type: '부동산',
        title: '아파트 구매 시 고려해야 할 사항',
        memberName: '부동산왕',
        memberId: 'bd123',
        regDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1달 전
        readCount: 45
    },
    {
        bno: 3,
        type: '부동산',
        title: '부동산 시장의 현재 상황',
        memberName: '투자자',
        memberId: 'investor1',
        regDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15일 전
        readCount: 29
    },
    {
        bno: 4,
        type: '부동산',
        title: '2024년 부동산 전망',
        memberName: '전문가',
        memberId: 'expert1',
        regDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5일 전
        readCount: 112
    }
]);

// 페이지네이션 정보
const currentPage = ref(1); // 현재 게시글 페이지
const totalPages = 10; // 전체 게시글 페이지 수

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