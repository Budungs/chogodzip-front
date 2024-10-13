<template>
    <div>
      <!-- Comments -->
      <div class="container">
        <!-- Comment -->
        <div class="border-bottom py-4 mt-2 mb-4">
          <div class="d-flex align-items-center pb-1 mb-3">
            <img
              class="rounded-circle"
              src="@/assets/img/comment/curbi.jpg"
              width="48"
              alt="Comment author"
            />
            <div class="ps-3">
              <h6 class="mb-0"> {{ cmt.memberName }}</h6>
              <span class="fs-sm text-muted"> {{ formatDate(cmt.createdAt) }}</span>
            </div>
          </div>
          <p class="pb-2 mb-0 command-text-container">
            {{ cmt.content }}
            <button type="button" class="btn btn-outline-danger btn-icon delete-btn-continer" @click="deleteComment(cmt.cmtId)" style="justify-content: center;">
              <i class="fa fa-trash"></i>
            </button>
          </p>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { formatDate } from '@/utils/timestamp.js';
  import axios from 'axios';

  const route = useRoute();
  const emit = defineEmits(['deleteComment']);
  
  const deleteComment = async (cmtId) => {
    if(!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const res = await axios.delete(`/api/community/${route.params.id}/comments`, {
        params: { cmtId: cmtId }
      });

      if(res.status === 200) {
        emit('deleteComment', cmtId);
      }
      
    } catch (err) {
      alert('댓글 삭제에 실패했습니다 😵‍💫');
    }
  };
  
  onMounted(() => {
    const preloader = document.querySelector('.page-loading');
    if (preloader) {
      preloader.classList.remove('active');
      setTimeout(() => {
        preloader.remove();
      }, 1500);
    }
  });

  const props = defineProps({
    cmt: {
      type: Object,
      required: true,
    },
  })
  </script>
  
  <style scoped>
  .page-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.4s 0.2s ease-in-out;
    background-color: #fff;
    opacity: 0;
    visibility: hidden;
    z-index: 9999;
  }
  .page-loading.active {
    opacity: 1;
    visibility: visible;
  }
  .page-loading-inner {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }
  .page-spinner {
    display: inline-block;
    width: 2.75rem;
    height: 2.75rem;
    margin-bottom: 0.75rem;
    background-color: #d7dde2;
    border-radius: 50%;
    animation: spinner 0.75s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: none;
    }
  }
  .command-text-container {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  </style>