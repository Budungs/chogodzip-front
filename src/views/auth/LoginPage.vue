<template>

  <div class="outer-container py-5 mb-5">
    <div class="container d-flex flex-column w-25 py-5 px-5 mb-5 rounded d-flex justify-content-center align-items-center" style="height: 60vh">
      <div class="mb-2" style="width:85%">
        <img class="w-100 mb-4" src="@/assets/img/chogod.png" width="250" alt="Chogodzip">
      </div>
      <div class="w-100 text-center">
        <div class="w-100 fs-lg mb-2" style="font-weight:bold">로그인하시고</div>
        <div class="w-100 fs-lg" style="font-weight:bold"><span class="text-primary">초갓집</span>과 함께 방 찾기 여정을 떠나보세요 !</div>
      </div>

      <div class="w-100 d-flex justify-content-center align-items-center mt-5" >
        <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=07df78249e73e0bcac8ddfe9af045b0a&redirect_uri=http://localhost:5173/auth/kakaojoin">
            <img class="w-100" src="@/assets/img/kakaologin/kakao_login_medium_narrow.png">
        </a>
      </div>

      <div class="w-100 d-flex justify-content-center align-items-center mt-2">
        <a class="mb-5" href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=07df78249e73e0bcac8ddfe9af045b0a&redirect_uri=http://localhost:5173/auth/kakaologin">
            <img class="w-100" src="@/assets/img/kakaologin/kakao_login_medium_narrow_login.png">
        </a>
      </div>
    </div>
  </div>




  <!-- <div class="mt-5 mx-auto" style="width: 500px">
    <a class="order-lg-3" href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=07df78249e73e0bcac8ddfe9af045b0a&redirect_uri=http://localhost:5173/auth/kakaojoin">
        <img src="@/assets/img/kakaologin/kakao_login_medium_narrow.png">
    </a>
    <a class="order-lg-3" href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=07df78249e73e0bcac8ddfe9af045b0a&redirect_uri=http://localhost:5173/auth/kakaologin">
        <img src="@/assets/img/kakaologin/kakao_login_medium_narrow_login.png" >
    </a>

    <form @submit.prevent="login">
      <div class="mb-3 mt-3">
        <label for="id" class="form-label">
          <i class="fa-solid fa-user"></i>
          사용자 ID:
        </label>
        <input type="text" class="form-control" placeholder="사용자 ID" v-model="member.id" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input type="password" class="form-control" placeholder="비밀번호" v-model="member.password" required />
      </div>

      <div v-if="error" class="text-danger">{{ error }}</div>

      <button type="submit" class="btn btn-primary mt-4" :disabled="disableSubmit">
        <i class="fa-solid fa-right-to-bracket"></i>
        로그인
      </button>
    </form>
  </div> -->
</template>
