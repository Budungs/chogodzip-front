<script setup>
import { computed, reactive, onMounted, } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

//////////////////////////////////////////////////////////
const member = reactive({
  code: '',
});

onMounted(async () => {
  try {
    member.code = route.query.code;
    console.log(member);

    await auth.login(member);
    alert('로그인이 완료 되었습니다.');
    router.push('/');
    
  } catch (e) {
    // 로그인 에러
    console.log('에러=======', e);
    error.value = e.response.data;
  }

});


const login = async () => {
  console.log(member);
  try {
    await auth.login(member);
    if (router.query.next) {
      router.push({ name: route.query.next });
    } else {
      // 일반
      router.push('/');
    }
  } catch (e) {
    // 로그인 에러
    console.log('에러=======', e);
    error.value = e.response.data;
  }
};
//////////////////////////////////////////////////////////
</script>

<template>
  <div class="mt-5 mx-auto" style="width: 100px">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
