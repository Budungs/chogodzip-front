<template>
  <div class="mypage-container">
    <h1 class="mt-5 mb-5" style="font-weight: 900;">MY PAGE</h1>
    <div class="tabs">
      <MyPageTab v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label"
        :isActive="isActiveTab(tab.name)" @tab-click="setActiveTab" />
    </div>

    <div class="profile-section mt-5 mb-5">
      <div class="profile-image">
        <!-- 프로필 이미지가 없으면 기본 이미지를 사용 -->
        <img :src="profileImgUrl" alt="Profile Image" />
        <button class="edit-button">
          <img :src="editImage" alt="Edit" />
        </button>
      </div>
    </div>

    <div class="form-section">
      <form>
        <div class="mypage-form-group">
          <label for="nickname">닉네임</label>
          <!-- 유저의 이름을 표시 -->
          <input type="text" id="nickname" v-model="userId" />
        </div>

        <!-- 주소 입력 필드 -->
        <div class="mypage-form-group address-group">
          <label for="address">실거주지</label>
          <div class="input-group">
            <!-- 유저의 주소를 표시 -->
            <input type="text" id="address"  v-model="userAddress" />
            <button class="btn btn-outline-secondary" type="button" @click="execDaumPostcode">검색</button>
          </div>
        </div>


        <!-- 관심 지역 -->
        <div class="mypage-form-group" style="margin-bottom:100px;">
          <label for="region">관심 지역</label>
          <select id="region-si" v-model="selectedSi">
            <option>서울시</option>
          </select>
          <select id="region-gu" v-model="selectedGu">
            <!-- 선택된 구 출력 -->
            <option value="" disabled selected>{{ guOnly }}</option>
            <option value="강남구">강남구</option>
            <option value="강동구">강동구</option>
            <option value="강북구">강북구</option>
            <option value="강서구">강서구</option>
            <option value="관악구">관악구</option>
            <option value="광진구">광진구</option>
            <option value="구로구">구로구</option>
            <option value="금천구">금천구</option>
            <option value="노원구">노원구</option>
            <option value="도봉구">도봉구</option>
            <option value="동대문구">동대문구</option>
            <option value="동작구">동작구</option>
            <option value="마포구">마포구</option>
            <option value="서대문구">서대문구</option>
            <option value="서초구">서초구</option>
            <option value="성동구">성동구</option>
            <option value="성북구">성북구</option>
            <option value="송파구">송파구</option>
            <option value="양천구">양천구</option>
            <option value="영등포구">영등포구</option>
            <option value="용산구">용산구</option>
            <option value="은평구">은평구</option>
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
            <option value="중랑구">중랑구</option>
          </select>

        </div>
        <div class="d-flex flex-wrap justify-content-center">
          <button type="submit" class="submit-button" @click="updateProfile">프로필 수정</button>
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
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import defaultProfileImage from "@/assets/images/pfp/pfp01.png"; 

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
      ],
      userAddress: ref(''), // 사용자 주소
      extraAddress: ref(''), // 추가 주소
      isDaumScriptLoaded: ref(false) // 스크립트 로드 상태 관리
    };
  },
  methods: {
    isActiveTab(name) {
      return this.activeTab === name;
    },
    setActiveTab(name) {
      this.activeTab = name;
    },

    // Daum 우편번호 검색 API 실행
    execDaumPostcode() {
      if (this.isDaumScriptLoaded) {
        new window.daum.Postcode({
          oncomplete: (data) => {
            let addr = ''; // 주소
            let extraAddr = ''; // 추가 주소

            if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
            } else {
              addr = data.jibunAddress;
            }

            if (data.userSelectedType === 'R') {
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
              }
              if (extraAddr !== '') {
                extraAddr = ` (${extraAddr})`;
              }
            }

            this.userAddress = addr; // 주소 설정
            this.extraAddress = extraAddr; // 추가 주소 설정

            this.$emit('update-address', this.userAddress + this.extraAddress);
            this.getCoordinates(addr);
          }
        }).open();
      } else {
        console.error('Daum Postcode script is not loaded yet.');
      }
    },

    // Kakao 지도 API: 주소의 위도 & 경도 추출
    getCoordinates(address) {
      const geocoder = new window.daum.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.daum.maps.services.Status.OK) {
          const { y: lat, x: lon } = result[0];
          console.log(`위도: ${lat}, 경도: ${lon}`);
        } else {
          console.error('Geocode was not successful: ' + status);
        }
      });
    },

    // 정보 수정
  async updateProfile() {
    try {
      // 업데이트할 데이터 수집
      const updatedData = {
        name: this.userId, // 사용자 이름
        address: this.userAddress, // 사용자 주소
        interestArea: `${this.selectedCity} ${this.selectedGu}`, // 관심 지역 (예: 서울시 은평구)
      };
      console.log("kakaoId : " + this.auth.kakaoId);

      // PUT 요청으로 데이터 전송
      const response = await axios.put(`/api/member/kakaoInfo/${this.auth.kakaoId}`, updatedData);

      // 서버 응답 처리 (성공)
      if (response.status === 200) {
        alert('프로필이 성공적으로 수정되었습니다.');
      } else {
        alert('프로필 수정에 실패했습니다.');
      }
    } catch (error) {
      // 에러 처리
      console.error('프로필 수정 중 오류 발생:', error);
      alert('프로필 수정 중 오류가 발생했습니다.');
    }
  },

  },

  // 유저 정보 처리
  setup() {
    const auth = useAuthStore();
    const userId = ref(auth.state.id); // 유저의 이름
    const userAddress = ref(auth.state.address); // 유저의 주소

    // 유저의 구만 추출 (ex. "서울시 강남구" -> "강남구")
    const guOnly = computed(() => {
      if (auth.state.interestArea) {
        return auth.state.interestArea.replace("서울시 ", "");
      }
      return "구";
    });

    // 이미지 처리
    const profileImgUrl = computed(() => {
      if (auth.state.profileImg == null) {
        return defaultProfileImage;
      } else {
        return `/api/member/profile/image/${auth.state.profileImg.split('/').pop()}`;
      }
    });

    return {
      userId,
      userAddress,
      guOnly,
      profileImgUrl,
    };
  },

  mounted() {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      this.isDaumScriptLoaded = true; // 스크립트가 로드되었을 때 플래그 설정
    };
    script.async = true;
    document.head.appendChild(script);
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
