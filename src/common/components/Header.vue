<template>
    <header class="navbar navbar-expand-lg navbar-light fixed-top" style="background-color: white" data-scroll-header>
        <div class="container">
            <!-- 로고 -->
            <a class="navbar-brand me-3 me-xl-4" href="/">
                <img class="d-block" src="@/assets/img/chogod.png" width="200" alt="Chogodzip">
            </a>

            <!-- 로그인했을 경우 마이페이지 라우터 모달: 닉네임, 프로필 사진 표시 -->
            <div v-if="islogin == true" class="dropdown d-none d-lg-block order-lg-3 my-n2 me-3">
                <a class="d-block py-2" href="#">
                    <!-- 프로필 이미지가 있으면 사용하고, 없으면 기본 이미지 사용 -->
                    <img 
                        class="rounded-circle" 
                        :src="profileImgUrl" 
                        width="40" 
                        alt="User"
                    >
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <div class="d-flex align-items-start border-bottom px-3 py-1 mb-2" style="width: 16rem;">
                        <img 
                        class="rounded-circle" 
                        :src="profileImgUrl" 
                        width="48" 
                        alt="User"
                        >
                        <div class="ps-2">
                            <h6 class="fs-base mb-0">{{id}}</h6>
                            <div class="fs-xs py-0">관심지역: {{interstLocation}}</div>
                        </div>
                    </div>
                    <a class="dropdown-item" href="/mypage/info"><i class="far fa-user-circle opacity-60 me-2"/>내 프로필</a>
                    <a class="dropdown-item" href="/mypage/favoriteLottos"><i class="fas fa-heart opacity-60 me-2"/>관심 청약 목록</a>
                    <a class="dropdown-item" href="/mypage/favoriteRooms"><i class="fas fa-heart opacity-60 me-2"></i>관심 매물 목록</a>
                    <a class="dropdown-item" href="/mypage/postReviews"><i class="fas fa-pencil-alt opacity-60 me-2"></i>작성 리뷰 목록</a>
                    <a class="dropdown-item" href="/mypage/postRooms"><i class="fas fa-pencil-alt opacity-60 me-2"></i>등록한 매물 목록</a>
                    <div class="dropdown-divider"></div>
                    <router-link class="dropdown-item" :to="'/chat'">
                        <i class="far fa-comments opacity-60 me-2"></i>채팅방 목록
                      </router-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/rooms">방 내놓기</a>
                    <a class="dropdown-item" href="#" @click="signOut">로그아웃</a>
                </div>
            </div>

            <!-- 로그인 / 회원가입 버튼 -->
            <!-- 임시 상태변화용 요소 -->
            <a v-if="islogin == false" class="btn btn btn-outline-accent btn-sm rounded-pill ms-2 order-lg-3" href="/auth/login">
                로그인 | <span class='d-none d-sm-inline'>회원 가입</span>
            </a>

            <!-- 헤더 메뉴 -->
            <div class="collapse navbar-collapse order-lg-2" id="navbarNav">
                <ul class="navbar-nav navbar-nav-scroll" style="max-height: 35rem">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">방 찾기</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/houses/maps/gosiwons">고시원</a></li>
                            <li><a class="dropdown-item" href="/houses/maps/room">자취방</a></li>
                            <li><a class="dropdown-item" href="/houses/maps/sharehouses">공유주거공간</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">청약</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/lottos/calendars">청약 캘린더</a></li>
                            <li><a class="dropdown-item" href="/lottos/lists">청약 목록</a></li>
                            <li><a class="dropdown-item" href="/lottos/news">청약 뉴스</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="/community">커뮤니티</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">도움말</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/help/easyDictionary">쉬운 말 사전</a></li>
                            <li><a class="dropdown-item" href="#">별별 통계</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
      </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import defaultProfileImage from "@/assets/images/pfp/pfp01.png"; 

// kakao login - 로그인 감지
// const { login, join } = config.accoutMenus;
const auth = useAuthStore();

let islogin = computed(() => auth.isLogin); // islogin 을 직접 바꿀 수는 없음. (computed 속성) - 값을 바꾸려면 auth.isLogin 값을 바꿔야 함.
console.log('islogin : ' + islogin.value);
const id = computed(() => auth.id); // id 을 직접 바꿀 수는 없음. (computed 속성)  - 값을 바꾸려면 auth.id 값을 바꿔야 함.
console.log('id : ' + id.value);
const profileImg = computed(() => auth.state.profileImg); // 프로필 이미지 가져오기
console.log('profileImg : ' + profileImg.value);
const interstLocation = computed(() => auth.state.interestArea); // 프로필 이미지 가져오기
console.log('interstLocation : ' + interstLocation.value);

// 프로필 이미지 URL 계산 (없으면 기본 이미지 사용, 공백, null, undefined 모두 기본 이미지 처리)
const profileImgUrl = computed(() => {
  // profileImg.value 가 null, undefined 또는 빈 문자열인 경우 기본 이미지 사용
  if (profileImg.value == null) {
    console.log("공백인듯?");
    return defaultProfileImage; // 기본 프로필 이미지 경로
  }
  // profileImg.value 가 유효한 경우 이미지 URL 계산
  return `/api/member/profile/image/${profileImg.value.split('/').pop()}`;
});
// (임시) 로그아웃
// const signOut = () => {
//     auth.isLogin = false; 
//     console.log("로그아웃했음" + islogin);
// };

const signOut = () => {
    auth.logout(); // Pinia의 logout action 호출 (stores/auth.js)
    console.log("로그아웃했음");
};

</script>