<template>
    <div class="Panel">
      <nav>
        <ul class="Tabs">
          <li 
            class="Tabs__tab" 
            :class="{ active: isActiveTab === 'calendars' }" 
            @click="setActiveTab('calendars')"
          >
            <router-link to="/lottos/calendars" style="text-decoration: none;"><h3>청약 캘린더</h3></router-link>
          </li>
          <li 
            class="Tabs__tab" 
            :class="{ active: isActiveTab === 'lists' }" 
            @click="setActiveTab('lists')"
          >
            <router-link to="/lottos/lists" style="text-decoration: none;"><h3>청약 목록</h3></router-link>
          </li>
          <li 
            class="Tabs__tab" 
            :class="{ active: isActiveTab === 'news' }" 
            @click="setActiveTab('news')"
          >
            <router-link to="/lottos/news" style="text-decoration: none;"><h3>뉴스</h3></router-link>
          </li>
          <li class="Tabs__presentation-slider" role="presentation"></li>
        </ul>
      </nav>
      <!-- <div class="Panel__body">
        <p v-if="isActiveTab === 'calendars'">청양 캘린더 탭 oao</p>
        <p v-if="isActiveTab === 'lists'">청약 목록 탭 owo</p>
        <p v-if="isActiveTab === 'news'">청약 뉴스 탭 ewe</p>
      </div> -->
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isActiveTab = ref(route.path.split('/').pop()); // URL의 마지막 부분을 기준으로 초기화

function setActiveTab(tab) {
  isActiveTab.value = tab;
}

// URL 변화 감지
watch(route, (newRoute) => {
  isActiveTab.value = newRoute.path.split('/').pop(); // URL이 변경될 때 isActiveTab 업데이트
});
</script>
  
<style scoped>
body {
  background-color: #d9d9d9;
  font-family: 'Roboto', sans-serif;
  width:100%;
}

.Panel {
  width: 100%;
  max-width: 500px;
}

.Panel__body {
  background-color: #f2f2f2;
  padding: 10px 20px;
}

.Tabs {
  position: relative;
  background-color: #fff;
  margin: 0;
  padding: 0;
  list-style: none;
}

.Tabs:after {
  content: ' ';
  display: table;
  clear: both;
}

.Tabs__tab {
  float: left;
  width: 33.333%;
  text-align: center;
}

.Tabs__tab:first-child.active ~ .Tabs__presentation-slider {
  transform: translateX(0) scaleX(0.333);
}

.Tabs__tab:nth-child(2).active ~ .Tabs__presentation-slider {
  transform: translateX(33.333%) scaleX(0.333);
}

.Tabs__tab:nth-child(3).active ~ .Tabs__presentation-slider {
  transform: translateX(calc(33.333% * 2)) scaleX(0.333);
}

.Tabs__tab > a > h3 {
    color: var(--main1);
}

.Tabs__presentation-slider {
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--main1);
  transform-origin: 0 0;
  transition: transform .25s;
}

.Tab {
  font-family: 'Roboto Slab';
}

.Tab > a {
  display: block;
  padding: 10px 12px;
  text-decoration: none;
  color: #666;
  transition: color .15s;
}

.Tab.active > a {
  color: #222;
}

.Tab:hover > a {
  color: #222;
}
</style>
  