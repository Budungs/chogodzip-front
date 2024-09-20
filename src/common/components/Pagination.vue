<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 이전 버튼 -->
        <li :class="['page-item', { disabled: isFirstPage }]">
          <a href="#" class="page-link" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
            <i class="fas fa-angle-left"></i>
          </a>
        </li>
  
        <!-- 페이지 번호: 모바일에서는 현재 페이지만 표시 -->
        <li class="page-item d-sm-none">
          <span class="page-link page-link-static">{{ currentPage }} / {{ totalPages }}</span>
        </li>
  
        <!-- 페이지 번호: 데스크탑에서는 1~N 페이지 표시 -->
        <li
          v-for="page in totalPages"
          :key="page"
          :class="['page-item', { active: page === currentPage }, 'd-none d-sm-block']"
        >
          <a href="#" class="page-link" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>
  
        <!-- 다음 버튼 -->
        <li :class="['page-item', { disabled: isLastPage }]">
          <a href="#" class="page-link" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
            <i class="fas fa-angle-right"></i>
          </a>
        </li>
      </ul>
    </nav>
</template>
  
<script setup>
import { computed, defineProps, defineEmits } from 'vue';

// 부모로부터 props로 데이터 전달 받기
const props = defineProps({
currentPage: {
    type: Number,
    required: true,
    default: 1,
},
totalPages: {
    type: Number,
    required: true,
}
});

// 부모로 클릭된 페이지 번호 전달
const emit = defineEmits(['update:page']);

// 이전/다음 버튼 비활성화 상태 계산
const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

// 페이지 변경 처리
const changePage = (page) => {
if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page); // 클릭된 페이지를 부모에게 전달
}
};
</script>
  
  