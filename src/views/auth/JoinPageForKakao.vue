<!-- 카카오 유저 정보 받아오는 것 체크 -->
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import authApi from '@/api/authApi';
import AddressAPI from '@/common/components/AddressAPI.vue';
import { useAuthStore } from '@/stores/auth'; // auth 스토어 가져오기

const router = useRouter();
const route = useRoute();
const avatar = ref(null);
const checkError = ref('');
const auth = useAuthStore(); // auth 스토어 사용

//////////////////////////////////////////////////////////
const member = reactive({
  id: 'test',
  name: '홍길동',
  email: 'hong@gmail.com',
  password: '1212',
  password2: '1212',
  avatar: null,
  kakaoId:'',
  address:'',
  interestArea:'',
});
//////////////////////////////////////////////////////////
const disableSubmit = ref(true);
const checkId = async () => {
  if (!member.id) {
    return alert('사용자 ID를 입력하세요.');
  }

  disableSubmit.value = await authApi.checkId(member.id);
  console.log(disableSubmit.value, typeof disableSubmit.value);
  checkError.value = disableSubmit.value ? '이미 사용중인 ID입니다.' : '사용가능한 ID입니다.';
};

const changeId = () => {
  disableSubmit.value = true;
  if (member.id) {
    checkError.value = 'ID 중복 체크를 하셔야 합니다.';
  } else {
    checkError.value = '';
  }
};

const join = async () => {
  if (member.password != member.password2) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  const formData = new FormData(); // formData 객체 생성
  
  if (avatar.value.files.length > 0) {
    member.avatar = avatar.value.files[0];
    formData.append('avatar', avatar.value.files[0]);
  }

  try {
    console.log('회원가입 요청 시작');
    await authApi.create(member); // 회원가입 요청

    // 회원가입 성공 후, 로그인 요청
    await auth.login({ id: member.id, password: member.password });

    console.log('회원가입 성공');
    router.push({ name: 'home' });
  } catch (e) {
     // 응답 데이터 확인
     if (e.response) {
      console.error('응답 데이터:', e.response.data); // 서버에서 반환한 데이터
      console.error('응답 상태 코드:', e.response.status); // 상태 코드
      console.error('응답 헤더:', e.response.headers); // 응답 헤더
    } else if (e.request) {
      console.error('요청은 전송되었으나 응답이 없습니다:', e.request);
    } else {
      console.error('요청 설정 중 에러 발생:', e.message);
    }
    router.push({ path: '/error' });
  }


};

const updateAddress = (address) => {
  member.address = address;
};


onMounted(async () => {
  if(route.query.code != null){
    const data = await authApi.getKakaoInfo(route.query.code);
    // alert(data.id);

    const data2 = await authApi.checkKakaoId(data.id);
    // alert(data2);

    if(data2 == true){
      alert('이미 카카오 아이디로 가입된 회원입니다.');
      router.push({ name: 'home' });
      return;
    }

    console.log(data.email)
    member.email = data.email;
    member.name = data.nickname;
    member.kakaoId = data.id;
  } 

});


</script>

<template>
  <div class="mt-5 mx-auto" style="width: 500px">
    <h1 class="my-5">
      <i class="fa-solid fa-user-plus"></i>
      회원 가입
    </h1>

    <form @submit.prevent="join">
      
      <div class="mb-3 mt-3">
        <label for="id" class="form-label">
          <i class="fa-solid fa-user"></i>
          사용자 ID :
          <button type="button" class="btn btn-success btn-sm py-0 me-2" @click="checkId">ID 중복 확인</button>
          <span :class="disableSubmit.value ? 'text-primary' : 'text-danger'">{{ checkError }}</span>
        </label>
        <input type="text" class="form-control" placeholder="사용자 ID" id="id" @input="changeId" v-model="member.id" />
      </div>

      <div>
        <label for="avatar" class="form-label">
          <i class="fa-solid fa-user-astronaut"></i>
          아바타 이미지:
        </label>
        <input type="file" class="form-control" ref="avatar" id="avatar" accept="image/png, image/jpeg" />
      </div>

      <div class="mb-3 mt-3">
        <label for="email" class="form-label">
          <i class="fa-solid fa-envelope"></i>
          email
        </label>
        <input type="email" class="form-control" placeholder="Email" id="email" v-model="member.email" />
      </div>

      <div class="mb-3 mt-3">
        <label for="name" class="form-label">
          <i class="fa-solid fa-user"></i>
          name
        </label>
        <input type="text" class="form-control" placeholder="Name" id="name" v-model="member.name" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input type="password" class="form-control" placeholder="비밀번호" id="password" v-model="member.password" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호 확인:
        </label>
        <input type="password" class="form-control" placeholder="비밀번호 확인" id="password2" v-model="member.password2" />
      </div>
      <!-- 실거주지 주소 입력 -->
      <label for="password" class="form-label">
        <i class="fa-solid fa-lock"></i>
        실거주지 주소
      </label>
          <!-- daum map search -->
      <div class="mb-3 pb-3">
        <AddressAPI  @update-address="updateAddress" />
      </div>

      <!-- 관심 지역 -->
      <label for="password" class="form-label">
        <i class="fa-solid fa-lock"></i>
        관심 지역
      </label>
      <div class="d-flex mb-3">
          <div class="input-group input-group-sm mb-3">
              <input placeholder="시/군" class="form-control" name="interestArea" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default" value="서울시" readonly>
          </div>
          <div class="input-group input-group-sm mb-3">
              <select v-model="member.interestArea" class="form-control" aria-label="Sizing example select" aria-describedby="inputGroup-sizing-default">
                  <option value="" disabled selected>구 선택</option>
                  <option value="강남구">강남구</option>
                  <option value="강동구">강동구</option>
                  <option value="강북구">강북구</option>
                  <option value="강서구">강서구</option>
                  <option value="관악구">관악구</option>
                  <option value="광진구">광진구</option>
                  <option value="구로구">구로구</option>
                  <option value="금천구">금천구</option>
                  <option value="노원구">노원구</option>
                  <option value="도봉구">도봉구</option>
                  <option value="동대문구">동대문구</option>
                  <option value="동작구">동작구</option>
                  <option value="마포구">마포구</option>
                  <option value="서대문구">서대문구</option>
                  <option value="서초구">서초구</option>
                  <option value="성동구">성동구</option>
                  <option value="성북구">성북구</option>
                  <option value="송파구">송파구</option>
                  <option value="양천구">양천구</option>
                  <option value="영등포구">영등포구</option>
                  <option value="용산구">용산구</option>
                  <option value="은평구">은평구</option>
                  <option value="종로구">종로구</option>
                  <option value="중구">중구</option>
                  <option value="중랑구">중랑구</option>
                </select>
                
          </div>
        </div>

      <!-- 확인 버튼 -->
      <button type="submit" class="btn btn-primary mt-4" :disabled="disableSubmit">
        <i class="fa-solid fa-user-plus"></i>
        확인
      </button>
    </form>

  </div>
</template>
