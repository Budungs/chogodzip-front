<template>
  <div class="mypage-container">
    <h1 class="mt-5" style="font-weight: 900;">MY PAGE</h1>
    <div class="tabs">
      <button class="tab active">내 정보</button>
      <button class="tab">관심 청약 목록</button>
      <button class="tab">관심 매물 목록</button>
      <button class="tab">작성 리뷰 목록</button>
      <button class="tab">등록한 매물 목록</button>
    </div>

    <div class="profile-section">
      <div class="profile-image">
        <img :src="laughImage" alt="Profile Image" />
        <button class="edit-button">
          <img :src="laughImage" alt="Edit" />
        </button>
      </div>
    </div>

    <div class="form-section">
      <form>
        <div class="form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" placeholder="설정된 닉네임" />
        </div>

        <div class="form-group">
          <label for="address">실거주지</label>
          <input type="text" id="address" placeholder="주소 입력" />
          <button class="search-button">검색</button>
        </div>

        <div class="form-group">
          <label for="detailed-address">상세주소</label>
          <input type="text" id="detailed-address" placeholder="상세주소" />
        </div>

        <div class="form-group">
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

        <button type="submit" class="submit-button">프로필 수정</button>
      </form>
    </div>

    <button class="logout-button">회원 탈퇴</button>
  </div>
</template>

<script>
import laughImage from "@/assets/img/laugh.png";
export default {
  name: "MyPage",
  data() {
    return {
      laughImage
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
  max-width: 800px;
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

.tab {
  flex-grow: 1;
  padding: 10px 0;
  border: none;
  background-color: #eee;
  cursor: pointer;
  border-right: 1px solid #ccc;
}

.tab.active {
  background-color: #7b3af5;
  color: white;
  border: none;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-image {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image img {
  width: 100%;
  height: 100%;
}

.edit-button {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.edit-button img {
  width: 20px;
  height: 20px;
}

.form-section {
  text-align: left;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #7b3af5;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #7b3af5;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.logout-button {
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
</style>
