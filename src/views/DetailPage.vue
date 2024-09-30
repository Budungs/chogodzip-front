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
      <h1 class="h2 mb-4">{{ house.NAME }}</h1>
      <div class="row">
        <!-- Left column-->
        <div class="col-md-5 mb-md-0 mb-4 pb-md-0 pb-2">
          <div class="row g-2 g-md-3 gallery" data-thumbnails="true" style="min-width: 30rem; min-height: 30rem;">
            <div class="col-12">
              <a class="gallery-item rounded rounded-md-3" :href="house.TITLE_IMAGE"
                data-sub-html="&lt;h6 class=&quot;fs-sm text-light&quot;&gt;Bathroom&lt;/h6&gt;">
                <img :src="house.TITLE_IMAGE" alt="Gallery thumbnail" style="width: 100%;">
              </a>
            </div>

            <div class="col-6">
              <a class="gallery-item rounded rounded-md-3" :href="house.TITLE_IMAGE"
                data-sub-html="&lt;h6 class=&quot;fs-sm text-light&quot;&gt;Bedroom&lt;/h6&gt;">
                <img :src="house.TITLE_IMAGE" alt="Gallery thumbnail" style="width: 100%;">
              </a>
            </div>
            <div class="col-6">
              <a class="gallery-item rounded rounded-md-3" :href="house.TITLE_IMAGE"
                data-sub-html="&lt;h6 class=&quot;fs-sm text-light&quot;&gt;Living room&lt;/h6&gt;">
                <img :src="house.TITLE_IMAGE" alt="Gallery thumbnail" style="width: 100%;">
              </a>
            </div>
          </div>
        </div>
        <!-- Sidebar-->
        <aside class="col-md-7">
          <!-- Place card-->
          <div>
            <div class="card-body"
              style="padding: 1.5em 3.0rem; border: 1px solid gainsboro; border-radius:25px; min-height: 30rem;">
              <!--가격-->
              <div class="pb-2 pt-3 border-bottom" style="padding-left: 25px;">
                <div class="row">
                  <div class="col">
                    <div class="mb-2">
                      <div style="font-size: 1.4rem; font-weight:bold;">보증금&nbsp;</div>
                      <span class="main1" style="font-size:48px; font-weight:bold;">{{ house.DEPOSIT_MIN
                        }}&nbsp;-&nbsp;{{
                          house.DEPOSIT_MAX
                        }}&nbsp;</span>
                      <span style="font-size: 1.3rem; color:#777777;">만원&nbsp;</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-2">
                      <div style="font-size: 1.4rem; font-weight:bold;">월세&nbsp;</div>
                      <span class="main1" style="font-size:48px; font-weight:bold;">{{ house.PRICE_MIN
                        }}&nbsp;-&nbsp;{{
                          house.PRICE_MAX
                        }}&nbsp;</span>
                      <span style="font-size: 1.3rem; color:#777777;">만원&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Place contacts-->
              <div class="mb-3 pb-3 pt-4 d-flex" style="justify-content: space-evenly;">
                <div class="text-center">
                  <span><img width="40" height="40" :src="floorImage" alt="Floor Image" class="pb-2" />
                  </span><span class="fs-5">&nbsp;&nbsp;총 {{ house.FLOOR }}층</span>
                </div>
                <div class="text-center">
                  <span><img width="40" height="40" :src="roomImage" alt="Room Image" class="pb-2" />
                  </span><span class="fs-5">&nbsp;&nbsp;총 {{ house.ROOM_CNT }}개의 방</span>
                </div>
                <div class="text-center">
                  <span><img width="40" height="40" :src="laughImage" alt="Laugh Image" class="pb-2" />
                  </span><span class="fs-5">&nbsp;&nbsp;{{ house.GENDER_TYPE_NM }}</span>
                </div>
              </div>
              <ul class="list-unstyled d-flex flex-wrap justify-content-center mb-2">
                <li v-for="(tag, index) in tagsArray" :key="index" class="fs-8" style="margin-right:8px;">
                  <span class="tag">{{ tag }}</span>
                </li>
              </ul>
              <!-- 지하철호선 -->
              <div class="d-flex flex-wrap justify-content-center">
                <img :src="subway_3" width="25" height="25" />
                <span style="margin-left:7px;" v-for="subway in house.nearSubways[0]" :key="subway.NAME">
                  {{ subway.FULL_NAME }}
                </span>
              </div>
              <!-- Place following-->
              <div class="pt-3 fs-6 d-flex flex-wrap justify-content-center">
                {{ house.ADDR_FULL_ROAD }}
              </div>
              <div class="pb-2 d-flex justify-content-center align-items-center pt-2">
                <button type="button" id="chat-btn"
                  style="border-radius: 55px; background-color:#D85F5F; color:white; padding:2px 8px; width:150px; height:55px; margin-right:10px;">
                  채팅
                </button>
                <div id="pay-btn"
                  style="display: flex; justify-content: center; align-items: center; width:150px; height:55px;">
                  <img :src="Kakao" style="max-height: 100%;" alt="Pay with Kakao" />
                </div>
              </div>

            </div>

          </div>
        </aside>
      </div>
      <!-- 카카오 지도 -->
      <div class="position-relative mt-4">
        <DetailMap class="rounded-3" :latitude="house.LATITUDE" :longitude="house.LONGITUDE" />
      </div>
    </section>
    <div>
      <div class="button-container d-flex justify-content-center" style="gap: 1rem;">
        <button type="button" class="btn btn-1 mt-5" id="backButton">목록으로 돌아가기</button>
        <button type="button" class="btn btn-1 mt-5" id="saveButton">관심매물 저장</button>
      </div>
    </div>
    <!-- Content-->
    <div class="mb-5">
      <!-- Tabs content-->
      <div class="tab-content pt-2">
        <!-- Reviews about you tab-->
        <div class="tab-pane fade show active" id="reviews-about-you" role="tabpanel">
          <!--ai요약-->
          <div class="ai-card">
            <h3 class="title">
              <span class="emoji mb-4">👾</span>
              <span class="h5">한눈에 보는 장단점 </span>
            </h3>
            <div class="toggle-bar" style="display:flex; width:100%;">
              <button style="  flex: 1;" :class="{ active: activeTab === 'pros' }"
                @click="activeTab = 'pros'">장점</button>
              <button style="  flex: 1;" :class="{ active: activeTab === 'cons' }"
                @click="activeTab = 'cons'">단점</button>
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
          <!-- Normal input -->
          <div class="mb-3 position-relative pt-2 pb-2">
            <input style="height: 100px; width: 100%;" class="form-control" id="input-normal" type="text">
            <button class="pt-2 btn"
              style="background: #68C9CB; color:white; position: absolute; right: 10px; bottom: 15px; padding: 5px 10px; font-size: 0.9rem;"
              type="submit">작성</button>
          </div>


          <!-- Review-->
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

          <!-- Pagination-->
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
.container {
  font-family: 'Spoqa Han Sans Neo';
}

.button-container {
  gap: 30px;
  justify-content: center;
  margin-bottom: 4rem;
}



#backButton {
  background-color: #d3d3d3;
  color: #666666;
  width: 250px;
}

#saveButton {
  background-color: #6cc7c1;
  color: white;
  width: 250px;
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
  padding: 35px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 12px;
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

#chat-btn {
  margin: 5px 0px;
  font-size: 25px;
  font-weight: 700;
  padding: 0px;
}

#pay-btn {
  margin: 5px 0px;
  padding: 0px;
}

.breadcrumb-item+.breadcrumb-item::before {
  content: ">";
}
</style>
