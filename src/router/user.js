// 로그인 + 회원가입
export default [
    // AddInfo 페이지로 이동
    {
      path: '/users/details',
      name: 'users/details',  
      component: () => import('../views/login_regist/AddInfo.vue'),
    },
    // RegistUser 페이지로 이동
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/login_regist/RegistUser.vue'),
    },
    // RegistUser 페이지로 이동
    {
      path: '/users/welcome',
      name: 'users/welcome',
      component: () => import('../views/login_regist/RegistComplete.vue'),
    },
    // login 페이지로 이동
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login_regist/KakaoLogin.vue'),
    },
  ];