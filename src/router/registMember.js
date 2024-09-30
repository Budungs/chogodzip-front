// 로그인 + 회원가입
export default [
    // AddInfo 페이지로 이동
    {
      path: '/addinfo',
      name: 'addInfo',
      component: () => import('../views/login_regist/AddInfo.vue'),
    },
    // RegistUser 페이지로 이동
    {
      path: '/registuser',
      name: 'registUser',
      component: () => import('../views/login_regist/RegistUser.vue'),
    },
    // RegistUser 페이지로 이동
    {
      path: '/registcomplete',
      name: 'registComplete',
      component: () => import('../views/login_regist/RegistComplete.vue'),
    },
    // login 페이지로 이동
    {
      path: '/login',
      name: 'kakaoLogin',
      component: () => import('../views/login_regist/KakaoLogin.vue'),
    },
  ];