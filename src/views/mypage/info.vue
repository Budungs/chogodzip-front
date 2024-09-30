<template>
  <div class="mypage-container">
    <h1 class="mt-5 mb-5" style="font-weight: 900;">MY PAGE</h1>
    <div class="tabs">
      <MyPageTab v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label"
        :isActive="isActiveTab(tab.name)" @tab-click="setActiveTab" />
    </div>

    <div class="profile-section mt-5 mb-5">
      <div class="profile-image">
        <img :src="user1Image" alt="Profile Image" />
        <button class="edit-button">
          <img :src="editImage" alt="Edit" />
        </button>
      </div>
    </div>

    <div class="form-section">
      <form>
        <div class="mypage-form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" placeholder="설정된 닉네임" />
        </div>

        <!-- 주소 입력 필드 -->
        <div class="mypage-form-group address-group">
          <label for="address">실거주지</label>
          <div class="input-group">
            <input type="text" id="address" placeholder="주소" />
            <button class="btn btn-outline-secondary" type="button">검색</button>
          </div>
        </div>



        <div class="mypage-form-group" style="margin-bottom:100px;">
          <label for="region">관심 지역</label>
          <select id="region-si">
            <option>시</option>
          </select>
          <select id="region-gu">
            <option>구</option>
          </select>
          <select id="region-dong">
            <option>동</option>
          </select>
        </div>
        <div class="d-flex flex-wrap justify-content-center">
          <button type="submit" class="submit-button">프로필 수정</button>
        </div>
      </form>
    </div>

    <div class="d-flex flex-wrap justify-content-center" style="margin-bottom: 5rem;">
      <button class="logout-button">회원 탈퇴</button>
    </div>
  </div>


</template>

<script>
import editImage from "@/assets/img/edit.png";
import user1Image from "@/assets/img/userImage/user1.png";
import MyPageTab from '@/modules/components/mypage/MyPageTab.vue';

export default {
  name: "info",
  components: {
    MyPageTab,
  },
  data() {
    return {
      editImage, user1Image,
      activeTab: 'info',
      tabs: [
        { name: 'info', label: '내 정보' },
        { name: 'favoriteLottos', label: '관심 청약 목록' },
        { name: 'favoriteRooms', label: '관심 매물 목록' },
        { name: 'postReviews', label: '작성 리뷰 목록' },
        { name: 'postRooms', label: '등록한 매물 목록' }
      ]
    }
  },
  methods: {
    isActiveTab(name) {
      return this.activeTab === name;
    },
    setActiveTab(name) {
      this.activeTab = name;
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Spoqa Han Sans Neo';
}

.mypage-container {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}



h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}


.profile-section {
  margin-bottom: 30px;
}

.profile-image {
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 50%;
  overflow: visible;
  border: 1px solid #ccc;
}

.edit-button {
  position: absolute;
  right: -1px;
  bottom: -1px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}



.edit-button img {
  width: 20px;
  height: 20px;
}

.form-section {
  text-align: left;
  margin-bottom: 30px;
}

.mypage-form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.mypage-form-group label {
  flex: 0 0 100px;
  margin-bottom: 5px;
}

.mypage-form-group input,
.mypage-form-group select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 50px;
}

.search-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #7747B5;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit-button {
  width: 12rem;
  padding: 10px;
  background-color: #D9D9D9;
  border: none;
  cursor: pointer;
}

.logout-button {
  width: 12rem;
  color: #5C5C5C;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.mypage-form-group.address-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button.btn {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #7747B5;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.detailed-address,
.additional-info {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  flex-grow: 1;
  gap: 10px;
  /* 입력 필드 간의 간격 조정 */
  align-items: center;
}

.input-container input[type="text"] {
  flex-grow: 1;
  /* 입력 필드의 크기를 동일하게 설정 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-container button.btn {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #7747B5;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
