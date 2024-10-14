<template>
    <div class="error-container">
      <h1>500 - Internal Server Error</h1>
      <p>member과 member_auth 데이터베이스를 확인해주세요.</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .error-container {
    text-align: center;
    margin-top: 50px;
    padding: 20px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1.2rem;
  }
  </style>
  