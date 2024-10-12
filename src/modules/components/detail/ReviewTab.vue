<template>
  <div class="ai-card">
      <div class="container">
          <h3 class="title mb-3" style="margin-left:15px;">
              <span class="emoji mb-4">👾</span>
              <span class="h5">한눈에 보는 장단점 </span>
          </h3>
          <div class="toggle-bar" style="display:flex; width:100%;">
              <button style="flex: 1;" :class="{ active: activeTab === 'pros' }" @click="activeTab = 'pros'">장점</button>
              <button style="flex: 1;" :class="{ active: activeTab === 'cons' }" @click="activeTab = 'cons'">단점</button>
          </div>

          <transition name="fade" mode="out-in">
              <div v-if="activeTab === 'pros'" key="pros" class="content">
                  <ul>
                      <li>
                          <p class="normal">지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</p>
                          <hr>
                      </li>
                      <li>
                          <p class="normal">근처 1분 거리에 편의점이 있습니다.</p>
                          <hr>
                      </li>
                      <li>
                          <p class="normal">주차장 공간이 넓습니다.</p>
                          <hr>
                      </li>
                  </ul>
              </div>
              <div v-else key="cons" class="content">
                  <ul>
                      <li>
                          <p class="normal">지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</p>
                          <hr>
                      </li>
                      <li>
                          <p class="normal">근처 1분 거리에 편의점이 있습니다.</p>
                          <hr>
                      </li>
                      <li>
                          <p class="normal">주차장 공간이 넓습니다.</p>
                          <hr>
                      </li>
                  </ul>
              </div>
          </transition>
      </div>
  </div>

  <div class="container">
      <div class="mb-5">
        <div class="tab-content pt-2">
          <div class="tab-pane fade show active" id="reviews-about-you" role="tabpanel">
            <div class="mb-3 position-relative pt-2 pb-2">
              <input style="height: 100px; width: 100%;" v-model="reviewContent" class="form-control" id="input-normal" type="text">
              <button class="pt-2 btn"
                style="background: #68C9CB; color:white; position: absolute; right: 10px; bottom: 15px; padding: 5px 10px; font-size: 0.9rem;" @click="submitReview"
                type="submit">작성</button>
            </div>
  
            <!-- 리뷰 데이터 렌더링 -->
            <div v-if="reviews && reviews.length > 0">
              <div v-for="review in paginatedReviews" :key="review.reviewId" class="mb-4 pb-4 border-bottom">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="rounded-circle me-1"
                      src="https://i.namu.wiki/i/Vj5qbEFSnNirgU_WzuKbQmLd20hbM6QyNGHb8f87wB4iUuMA-OliDHoQMBnxu7jSowmBl5R-wBKXIb5Voe1bxw.webp"
                      width="40" height="40" alt="Avatar" style="width:50px; height:50px;">
                    <div class="ps-2">
                      <h6 class="fs-base mb-0">{{ review.userId }}</h6> <!-- 사용자 ID -->
                      <span class="text-muted fs-sm">{{ formatDate(review.createdAt) }}</span> 
                   </div>
                  </div>
                </div>
                <p style="margin-left:4rem;">{{ review.reviewContent }}</p> <!-- 리뷰 내용 -->
              </div>
            </div>
            <p v-else>아직 리뷰가 없습니다.</p>

            <!-- Pagination -->
            <nav class="mt-2" aria-label="Reviews pagination" v-if="totalPages > 1">
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="prevPage">이전</a>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="nextPage">다음</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '@/api/detailRoom';

const props = defineProps({
cardData: {
  type: Object,
  required: true,
},
reviews: {
  type: Array,
  default: () => [],
},
userId: {
  type: String,
  required: false,
},
});

const reviewContent = ref('');
const currentPage = ref(1);
const commentsPerPage = 5;

// Paginated reviews 계산
const paginatedReviews = computed(() => {
const start = (currentPage.value - 1) * commentsPerPage;
const end = start + commentsPerPage;
return props.reviews.slice(start, end);
});

// 총 페이지 계산
const totalPages = computed(() => {
return Math.ceil(props.reviews.length / commentsPerPage);
});

const goToPage = (page) => {
currentPage.value = page;
};

const prevPage = () => {
if (currentPage.value > 1) {
  currentPage.value -= 1;
}
};

const nextPage = () => {
if (currentPage.value < totalPages.value) {
  currentPage.value += 1;
}
};

const submitReview = async () => {
if (!reviewContent.value.trim()) {
  alert('댓글을 작성해주세요.');
  return;
}

const params = {
  userId: props.userId,
  roomId: props.cardData.room.roomId,
  reply: reviewContent.value,
};

try {
  const response = await api.registReply(params);
  if (response) {
    reviewContent.value = ''; 
    window.location.reload();
  } else {
    alert('댓글 등록에 실패했습니다.');
  }
} catch (error) {
  console.error('댓글 등록 오류:', error);
  alert('댓글 등록 중 오류가 발생했습니다.');
}
};

const formatDate = (timestamp) => {
const date = new Date(timestamp);
return date.toLocaleDateString();
};

const activeTab = ref('pros');
</script>

<style scoped>
.ai-card {
background-color: #f7f2fc;
padding-top: 4rem;
padding-bottom: 4rem;
border-radius: 8px;
width: 100%;
margin-bottom: 2rem;
}

.toggle-bar {
margin-top: 1rem;
border-radius: 5px;
overflow: hidden;
margin-bottom: 30px;
}

button {
background-color: #ddd;
padding: 10px;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s;
}

button.active {
background-color: #a88cdb;
color: white;
}

button:not(.active):hover {
background-color: #ddd;
}

.fade-enter-active,
.fade-leave-active {
transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
opacity: 0;
}

ul {
list-style: none;
}

li {
font-size: medium;
margin-bottom: 20px;
}
</style>
