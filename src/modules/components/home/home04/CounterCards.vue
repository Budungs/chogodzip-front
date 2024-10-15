<template>
    <div class="row justify-content-around">
        <div class="col-md-4">
            <div class="counter-box d-flex flex-column pt-5 pb-4 rounded-3 shadow">
                <i class="fas fa-bullhorn display-6"></i>
                <span class="counter display-5">57</span>
                <p class="h4 mt-1">공고중</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="counter-box d-flex flex-column pt-5 pb-4 rounded-3 shadow">
                <i class="fas fa-flag-checkered display-6"></i>
                <span class="counter display-5" style="color:var(--caution)">11</span>
                <p class="h4 mt-1">접수중</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="counter-box d-flex flex-column pt-5 pb-4 rounded-3 shadow">
                <i class="fas fa-pencil-alt display-6"></i>
                <span class="counter display-5">0</span>
                <p class="h4 mt-1">오늘 등록</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    let currentCounter = 0;
    const target = parseInt(counter.innerText);
    const duration = 4000;
    const interval = 1000 / 60;
    const step = target / (duration / interval);
    
    const updateCounter = () => {
      currentCounter += step;
      if (currentCounter < target) {
        counter.innerText = Math.ceil(currentCounter);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCounter();
  });
});
</script>

<style scoped>
.counter-box {
	background: #F7F8FA;
	text-align: center
}


.counter-box p {
	color: var(--gray1);
}

.counter {
    color: var(--main3);
}
</style>