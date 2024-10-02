<template>
  <div class="container">
    <!-- Page content -->

    <section class="container" style="margin-top: 40px;">
      <nav aria-label="breadcrumb" style="margin:0px;">
        <ol class="breadcrumb" style="margin:0px;">
          <li class="breadcrumb-item"><a href="http://localhost:5173/houses/maps/sharehouses">공유주거공간</a></li>
          <li class="breadcrumb-item active">쉐어하우스</li>
        </ol>
      </nav>
      <div class="row" style="align-items: stretch;">
        <!-- Left column-->
        <div class="col-md-7 mb-md-0 mb-4" style="display: flex; flex-direction: column;">
          <div class="g-2 g-md-3 gallery" data-thumbnails="true" style="flex-grow: 1;">
            <a class="gallery-item rounded rounded-md-3" :href="house.TITLE_IMAGE"
              data-sub-html="&lt;h6 class=&quot;fs-sm text-light&quot;&gt;Bathroom&lt;/h6&gt;">
              <img :src="house.TITLE_IMAGE" alt="Gallery thumbnail"
                style="width: 100%; height: 100%; object-fit: cover;">
            </a>
          </div>
        </div>
        <!-- Sidebar-->
        <aside class="col-md-5" style="display: flex; flex-direction: column;">
          <div style="margin-left: 1rem; flex-grow: 1;">
            <p class="fs-lg">매물번호: M001147474</p>
            <h3>보증금 {{ house.DEPOSIT_MIN }}-{{ house.DEPOSIT_MAX }} / 월세 {{ house.PRICE_MIN }}-{{ house.PRICE_MAX }}
            </h3>
            <div>관리비 12만원</div>
            <hr class="mt-3 mb-3" style="height:2px; border-color:#0C0C0C;">
            <div class="fs-6" style="color:black;">홍제동</div>
            <div class="fs-6 mb-3" style="color:black;">공유주거공간</div>
            <!-- 지하철호선 -->
            <div class="mb-3">
              <img :src="subway_3" width="25" height="25" />
              <span class="main1" style="margin-left:7px; font-weight:bolder" v-for="subway in house.nearSubways[0]"
                :key="subway.NAME">
                {{ subway.NAME }} </span><span style="margin-left:1rem;">도보 10분 </span>
            </div>
            <div class="d-flex justify-content-end">
              <button class="s-btn"><i class="s-icon far fa-heart"
                  style="margin-right:0.5rem;" /><span>116</span></button>
              <button class="s-btn"><i class="s-icon fas fa-map-marker-alt" /></button>
              <button class="s-btn"><i class="s-icon far fa-comments" /></button>
              <button class="s-btn"><i class="s-icon far fa-edit" /></button>
              <button class="s-btn"><i class="s-icon fas fa-trash-alt" style="color: #D85F5F" /></button>
            </div>
          </div>
          <div class="market-price d-flex flex-column align-items-center">
            <h6 class="main1 mt-3" style="margin-left: 7px; font-weight: bolder; color: #D85F5F;">
              서울시 광진구 화양동
            </h6>
            <div class="row" style="width: 25rem;">
              <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                <div style="font-weight: bold; color:black;">평균</div>
                <div><span
                    style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                </div>
              </div>
              <div class="col text-center" style="border-right: solid 3px #D2D2D2">
                <div style="font-weight: bold; color:black;">평균</div>
                <div><span
                    style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                </div>
              </div>
              <div class="col text-center">
                <div style="font-weight: bold; color:black;">평균</div>
                <div><span
                    style="font-weight: bolder; color: #D85F5F; font-size: 1.3rem; margin-right: 0.2rem;">97</span>만원
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
  <div class="gray-container">
    <div class="container">
      <div class="white-box p-5 mb-4">
        <div class="d-flex justify-content-center h4"><span>서울시 광진구 화양동 144-1</span><span>다세대(빌라/연립)</span></div>
        <div class="features d-flex justify-content-between">
          <div class="feature">
            <img :src="ApartmentIcon" alt="Loan Icon" />
            <span>개인화장실</span>
          </div>
          <div class="feature">
            <img :src="ApartmentIcon" alt="Mortgage Icon" />
            <span>식사제공</span>
          </div>
          <div class="feature">
            <img :src="DepartmentIcon" alt="Room Icon" />
            <span>2~3층</span>
          </div>
          <div class="feature">
            <img :src="DepartmentIcon" alt="Area Icon" />
            <span>방 12개</span>
          </div>
          <div class="feature">
            <img :src="ParkingIcon" alt="Parking Icon" />
            <span>주차가능</span>
          </div>
          <div class="feature">
            <img :src="ToiletIcon" alt="Pets Icon" />
            <span>남녀공용</span>
          </div>
        </div>

        <div class="description">
          <p>침대대출가능 모두가능 저융자 안전한방</p>
          <p>복층형 원룸 단독타입(사무 등록 저융자로 공감으로, 크지 않습니다)</p>
          <p>반려동물 협의 (고양이 가능, 장애있는 소형견입주 협의 가능)</p>
          <p>임대인 국세, 저융세 협박 확인 (쉽게 연락가능)</p>
          <p>임대차 보호 특별법에 의해 임차인 보호 특약 대상 많이 넣어드립니다</p>
          <p>훌륭한 전세시장은 침착히 보증보험 가입해서 저희와 보증금 안전하게 지키세요!</p>
          <div class="more-button main1 mt-2" type="button"><strong>소개 더보기</strong></div>
        </div>
      </div>
      <div class="row white-box" style="margin: auto; width: 100%;">
        <div class="col-md-6">
          <div class="table1">
            <div class="info-container">
              <h4>매물정보</h4>
              <table>
                <tbody>
                  <tr>
                    <th>임대 유형</th>
                    <td>월세</td>
                  </tr>
                  <tr>
                    <th>보증금</th>
                    <td>10만원</td>
                  </tr>
                  <tr>
                    <th>월 이용료</th>
                    <td>29~41만원</td>
                  </tr>
                  <tr>
                    <th>관리비</th>
                    <td>3~6만원</td>
                  </tr>
                  <tr>
                    <th>이용기간<br />(계약기간)</th>
                    <td>제한없음</td>
                  </tr>
                  <tr>
                    <th>이용연령</th>
                    <td>연령제한 없음</td>
                  </tr>
                  <tr>
                    <th>방 종류</th>
                    <td>1인실(9개) 2인실(7개)</td>
                  </tr>
                  <tr>
                    <th>남녀구분</th>
                    <td>여성전용</td>
                  </tr>
                  <tr>
                    <th>기타사항</th>
                    <td>외국인</td>
                  </tr>
                  <tr>
                    <th>제공 서비스</th>
                    <td>청소업체 현금서비스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="table2">
            <div class="info-container table2">
              <h4>공용시설</h4>
              <table>
                <tbody>
                  <tr>
                    <th>난방시설</th>
                    <td>중앙난방</td>
                  </tr>
                  <tr>
                    <th>세탁시설</th>
                    <td>세탁기 건조기 다리미</td>
                  </tr>

                  <tr>
                    <th>주방시설</th>
                    <td>전자레인지 전기밥솥 정수기 가스레인지</td>
                  </tr>
                  <tr>
                    <th>생활시설</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>제공비품</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="info-container table2">
              <h4>건물정보</h4>
              <table>
                <tbody>
                  <tr>
                    <th>건물형태</th>
                    <td>단독주택</td>
                  </tr>
                  <tr>
                    <th>주차</th>
                    <td>가능</td>
                  </tr>
                  <tr>
                    <th>엘레베이터</th>
                    <td>없음</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="white-box mt-4 p-5">
        <h4 class="mb-3">위치</h4>
        <div class="fs-6 mb-3" style="color:black;">서울 관악구 봉천동</div>
        <!-- 지하철호선 -->
        <div class="mb-3">
          <img :src="subway_3" width="20" height="20" />
          <span style="margin-left:16px;" v-for="subway in house.nearSubways[0]" :key="subway.NAME">
            {{ subway.NAME }} </span>
        </div>
        <div class="mb-3">
          <i class="fas fa-school" />
          <span style="margin-left:1rem;">숭실대학교</span>
        </div>

        <div class="position-relative mt-4">
          <DetailMap class="rounded-3" :latitude="house.LATITUDE" :longitude="house.LONGITUDE" />
        </div>
      </div>
    </div>
  </div>
  <!--ai요약-->
  <div class="ai-card">
    <div class="container">
      <h3 class="title" style="margin-left:7px;">
        <span class="emoji mb-4">👾</span>
        <span class="h5">한눈에 보는 장단점 </span>
      </h3>
      <div class="toggle-bar" style="display:flex; width:100%;">
        <button style="  flex: 1;" :class="{ active: activeTab === 'pros' }" @click="activeTab = 'pros'">장점</button>
        <button style="  flex: 1;" :class="{ active: activeTab === 'cons' }" @click="activeTab = 'cons'">단점</button>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'pros'" key="pros" class="content">
          <ul>
            <li>
              <p class="normal">지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</p>
              <hr>
            </li>
            <li>
              <p class="normal">근처 1분 거리에 편의점이 있습니다.</p>
              <hr>
            </li>
            <li>
              <p class="normal">주차장 공간이 넓습니다.</p>
              <hr>
            </li>
          </ul>
        </div>
        <div v-else key="cons" class="content">
          <ul>
            <li>
              <p class="normal">지하철과 버스 정류장이 매우 가까워 대중교통 이용이 편리합니다.</p>
              <hr>
            </li>
            <li>
              <p class="normal">근처 1분 거리에 편의점이 있습니다.</p>
              <hr>
            </li>
            <li>
              <p class="normal">주차장 공간이 넓습니다.</p>
              <hr>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
  <div class="container">
    <!-- Content-->
    <div class="mb-5">
      <!-- Tabs content-->
      <div class="tab-content pt-2">
        <!-- Reviews about you tab-->
        <div class="tab-pane fade show active" id="reviews-about-you" role="tabpanel">

          <!-- Normal input -->
          <div class="mb-3 position-relative pt-2 pb-2">
            <input style="height: 100px; width: 100%;" class="form-control" id="input-normal" type="text">
            <button class="pt-2 btn"
              style="background: #68C9CB; color:white; position: absolute; right: 10px; bottom: 15px; padding: 5px 10px; font-size: 0.9rem;"
              type="submit">작성</button>
          </div>


          <!-- 리뷰 -->
          <div class="mb-4 pb-4 border-bottom" v-for="review in 3" :key="review">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center pe-2"><img class="rounded-circle me-1" :src="house.TITLE_IMAGE"
                  width="40" height="40" alt="Avatar" style="width:50px !important; height:50px !important;">
                <div class="ps-2">
                  <h6 class="fs-base mb-0">말리부</h6><span class="star-rating"></span>
                </div>
              </div><span class="text-muted fs-sm">Jan 17, 2021</span>
            </div>
            <p style="margin-left:4rem;">집주인이 친절하세요. 이번에 전등 나갔을 때도 친절히 수정 도와주셨어요 ! 근처 공원이 있는 점도 마음에 듭니다.</p>

          </div>

          <!-- 페이지네이션 -->
          <nav class="mt-2" aria-label="Reviews pagination">
            <ul class="pagination">
              <li class="page-item d-sm-none"><span class="page-link page-link-static">1 /
                  5</span></li>
              <li class="page-item active d-none d-sm-block" aria-current="page"><span class="page-link">1<span
                    class="visually-hidden">(current)</span></span>
              </li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">2</a></li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">3</a></li>
              <li class="page-item d-none d-sm-block">...</li>
              <li class="page-item d-none d-sm-block"><a class="page-link" href="#">8</a></li>
              <li class="page-item"><a class="page-link" href="#" aria-label="Next"></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import floorImage from "@/assets/img/floor.png";
import laughImage from "@/assets/img/laugh.png";
import roomImage from "@/assets/img/room.png";
import mapImage from "@/assets/img/map.png";
import DetailMap from '@/common/components/DetailMap.vue';
import Kakao from '@/assets/img/Kakao.png';
import subway_3 from '@/assets/img/subway_3.png';
import ApartmentIcon from '@/assets/img/detail/Apartment.png';
import DepartmentIcon from '@/assets/img/detail/Department.png';
import ParkingIcon from '@/assets/img/detail/Parking.png';
import ToiletIcon from '@/assets/img/detail/Toilet.png';

export default {
  components: {
    DetailMap,
  },
  data() {
    const tagsString =
      "1개월~#FIXED|남녀분리#FIXED|주소이전|신용카드|방역업체|현금영수증|청소업체|식사제공|외국어 응대|커피머신|공기청정기|테라스|헬스장|개인에어컨|개인화장실";

    const tagsArray = tagsString
      .split("|")
      .map((tag) => tag.replace("#FIXED", "").trim())
      .filter((tag) => tag)
      .map((tag) => `#${tag}`);
    return {
      activeTab: 'pros',
      floorImage,
      laughImage,
      roomImage,
      mapImage,
      Kakao,
      subway_3,
      ApartmentIcon,
      DepartmentIcon,
      ParkingIcon,
      ToiletIcon,
      house: {
        ROOM_CNT: "39",
        nearSubways: [
          [
            {
              distance: "0.2682673564953376",
              LINE: "수도권3호선",
              FULL_NAME: "수도권3호선_홍제역",
              LINE_SHORT: "3호선",
              NAME: "홍제역",
            },
          ],
        ],
        NAME: "everyspace (방배)",
        HOUSE_TYPE_NMS: "쉐어하우스",
        HOUSE_TYPE_CD: "HOUTP00008",
        ADDR_DETAIL: "3층",
        FLOOR: "3|3",
        TAGS: tagsString,
        TITLE_IMAGE:
          "https://image.neoflat.net/XgJgIpc_kWfzAjKs0JqzbIiE7VU=/1440x/filters:no_upscale():watermark(/resource/gobang.png,center,center,0,20,none)/house/4090/bf533c6a-3608-4e47-84b7-992b0e0e8437.png",
        GENDER_TYPE_NM: "성별무관",
        PRICE_MAX: "62",
        PRICE_MIN: "45",
        DEPOSIT_MAX: "75",
        DEPOSIT_MIN: "49",
        LATITUDE: "37.5874508664436",
        LONGITUDE: "126.941627260178",
        ADDR_FULL_ROAD: "서울 용산구 백범로79길 81",
      },
      tagsArray,
    };
  },
};
</script>

<style scoped>
.gray-container {
  background: #EDEDED;
  margin-top: 5rem;
  padding: 3rem;
  padding-top: 7rem;
  padding-bottom: 7rem;
}

.market-price {
  margin-top: 1rem;
  border-radius: 20px;
  background: #F1F1F1;
  height: 8.5rem;
}

.s-btn {
  background: white;
  border: 1px solid #ddd;
  margin-left: 0.5rem;
}

.s-icon {
  width: 25px;
}

.container {
  font-family: 'Spoqa Han Sans Neo';
}

.border-20 {
  border-radius: 20px;
}

.house-btn {
  border-radius: 25px;
  color: white;
  background: #7747b5;
  padding: 10px 15px;
  font-weight: 700;
}

.main1 {
  color: #7747b5;
}

.tag {
  background: #E5E5E5;
  color: #000;
  padding: 3px 6px;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}

.house-image {
  width: 100%;
  max-height: 700px;
  border-radius: 20px;
  object-fit: cover;
}


.ai-card {
  background-color: #f7f2fc;
  padding-top: 4rem;
  padding-bottom: 4rem;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 2rem;
}

.title {
  font-size: 18px;
  color: black;

  align-items: center;
  margin-bottom: 10px;
}

.emoji {
  margin-right: 8px;
}

/* Toggle button bar */
.toggle-bar {
  margin-top: 1rem;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 30px;
}

button {
  /* Allow buttons to take equal width */
  padding: 5px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

button.active {
  background-color: #a88cdb;
  color: white;
}

button:not(.active):hover {
  background-color: #ddd;
}

.content {
  font-size: 14px;
  color: #333;
}

ul {
  list-style: none;
}

li {
  font-size: medium;
  margin-bottom: 20px;
}

/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


button {
  background-color: #ddd;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.active {
  background-color: #a88cdb;
}

.content {
  font-size: 14px;
  color: #333;
}


/* Simple fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.border-20 {
  border-radius: 20px;
}

.house-btn {
  border-radius: 25px;
  color: white;
  background: #7747b5;
  padding: 10px 15px;
  font-weight: 700;
}

.main1 {
  color: #7747b5;
}


.house-image {
  width: 100%;
  max-height: 700px;
  border-radius: 20px;
  object-fit: cover;
}

.page-loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all .4s .2s ease-in-out;
  transition: all .4s .2s ease-in-out;
  background-color: #fff;
  opacity: 0;
  visibility: hidden;
  z-index: 9999;
}

.page-loading.active {
  opacity: 1;
  visibility: visible;
}

.page-loading-inner {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: opacity .2s ease-in-out;
  transition: opacity .2s ease-in-out;
  opacity: 0;
}

.page-loading.active>.page-loading-inner {
  opacity: 1;
}

.page-loading-inner>span {
  display: block;
  font-size: 1rem;
  font-weight: normal;
  color: #666276;
  ;
}

.page-spinner {
  display: inline-block;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: .75rem;
  vertical-align: text-bottom;
  border: .15em solid #bbb7c5;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner .75s linear infinite;
  animation: spinner .75s linear infinite;
}

.center {

  justify-content: center;
  align-items: center;
}

@-webkit-keyframes spinner {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spinner {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.breadcrumb-item+.breadcrumb-item::before {
  content: ">";
}

.features {
  padding: 1.5rem 1rem 1.5rem 1rem;
  border-top: solid 1px #C5C5C5;
  border-bottom: solid 1px #C5C5C5;
  margin: 3rem auto 3rem;
}

.features img {
  margin-right: 0.3rem;
}

.description {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #cdcad45f;
}

td {
  height: 3.5rem;
  padding-left: 1rem;
  border-bottom: 1px solid #cdcad45f;
}

th {
  background: #F5F6F7;
  padding-left: 1rem;
  border-right: 1px solid #cdcad45f;
  border-bottom: 1px solid #cdcad45f
}


.info-container {
  padding: 2rem;
}

.white-box {
  background: white;
}
</style>
