<template>
    <header class="navbar navbar-expand-lg navbar-light fixed-top" style="background-color: white" data-scroll-header>
        <div class="container">
            <!-- 로고 -->
            <a class="navbar-brand me-3 me-xl-4" href="/">
                <img class="d-block" src="@/assets/images/logo1.png" width="200" alt="Chogodzip">
            </a>

            <!-- 로그인했을 경우 마이페이지 라우터 모달: 닉네임, 프로필 사진 표시 -->
            <div v-if="isUser" class="dropdown d-none d-lg-block order-lg-3 my-n2 me-3">
                <a class="d-block py-2" href="#"><img class="rounded-circle" src="@/assets/images/pfp/pfp01.png" width="40" alt="User"></a>
                <div class="dropdown-menu dropdown-menu-end">
                    <div class="d-flex align-items-start border-bottom px-3 py-1 mb-2" style="width: 16rem;"><img class="rounded-circle" src="@/assets/images/pfp/pfp01.png" width="48" alt="User">
                        <div class="ps-2">
                            <h6 class="fs-base mb-0">제갈민수</h6>
                            <div class="fs-xs py-0">관심지역: 서울시 광진구</div>
                        </div>
                    </div>
                    <a class="dropdown-item" href="#"><i class="far fa-user-circle opacity-60 me-2"/>내 프로필</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-heart opacity-60 me-2"/>관심 청약 목록</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-heart opacity-60 me-2"></i>관심 매물 목록</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-pencil-alt opacity-60 me-2"></i>작성 리뷰 목록</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-pencil-alt opacity-60 me-2"></i>등록한 매물 목록</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">방 내놓기</a>
                    <a class="dropdown-item" href="#" @click="signOut">로그아웃</a>
                </div>
            </div>

            <!-- 로그인 / 회원가입 버튼 -->
            <!-- 임시 상태변화용 요소 -->
            <a v-if="!isUser" class="btn btn btn-outline-accent btn-sm rounded-pill ms-2 order-lg-3" href="#" @click="signIn">
            <!-- <a v-if="!isUser" class="btn btn btn-outline-accent btn-sm rounded-pill ms-2 order-lg-3" href="/login" @click="signIn"> -->
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
                        <a class="nav-link" href="/communitymain">커뮤니티</a>
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
import { ref } from 'vue';

// 임시 로그인 - 로그아웃 처리
let isUser = ref(false);

const signIn = () => isUser.value = true;
const signOut = () => isUser.value = false;
</script>