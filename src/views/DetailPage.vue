<template>
  <div class="container">
    <!-- Page content-->
    <!-- Page header-->
    <!-- Nav pills-->
    <ul class="nav nav-pills border-bottom pb-3 ml-2" style="margin:25px;">
      <li class="nav-item">
        <a class="nav-link d-flex align-items-center active">상세페이지</a>
      </li>
      <li class="nav-item">
        <a class="nav-link d-flex align-items-center">리뷰</a>
      </li>
    </ul>
    <!-- Page content -->
    <section class="container pb-5 mb-md-4">
      <div class="row">
        <!-- Left column-->
        <div class="col-md-7 mb-md-0 mb-4 pb-md-0 pb-2">
          <img :src="house.TITLE_IMAGE" alt="House Image" class="house-image" />

          <div class="mb-4 pb-md-3 mt-4">
            <h2 class="h4" v-for="subway in house.nearSubways[0]" :key="subway.NAME">
              🚉 {{ subway.FULL_NAME }}
            </h2>
            <ul class="list-unstyled d-flex flex-wrap mb-2">
              <li v-for="tag in tagsArray" :key="tag" class="mb-3">
                <span class="tag">{{ tag }}</span>
              </li>
            </ul>
          </div>

          <hr class="my-4" />
        </div>
        <!-- Sidebar-->
        <aside class="col-md-5">
          <!-- Place card-->
          <div class="card mb-4 p-2 shadow-sm">
            <div class="card-body">
              <!-- Place info-->
              <div class="d-flex align-items-start mb-3 pb-2 border-bottom">
                <div class="house-btn">쉐어하우스</div>
                <div class="ps-2 ms-1">
                  <h4>{{ house.NAME }}</h4>
                </div>
              </div>

              <!-- Place contacts-->
              <div class="mb-3 pb-3 pt-3 border-bottom d-flex justify-content-around">
                <div class="text-center">
                  <img width="70" height="70" :src="floorImage" alt="Floor Image" class="pb-2" />
                  <h6>총 {{ house.FLOOR }}층</h6>
                </div>
                <div class="text-center">
                  <img width="70" height="70" :src="roomImage" alt="Room Image" class="pb-2" />
                  <h6>총 {{ house.ROOM_CNT }}개의 방</h6>
                </div>
                <div class="text-center">
                  <img width="70" height="70" :src="laughImage" alt="Laugh Image" class="pb-2" />
                  <h6>{{ house.GENDER_TYPE_NM }}</h6>
                </div>
              </div>
              <!-- Place pricing-->
              <div class="pb-3 pt-3 border-bottom">
                <div class="row row-cols-1">
                  <div class="col">
                    <h6 class="h5 mb-2">
                      <span class="fs-4">보증금&nbsp;</span>
                      <span class="fs-4 main1">{{ house.DEPOSIT_MIN }}-{{
                        house.DEPOSIT_MAX
                      }}&nbsp;</span>
                      <span class="fs-4">만원&nbsp;</span>
                    </h6>
                    <h6 class="h5 mb-0">
                      <span class="fs-4">월세&nbsp;</span>
                      <span class="fs-4 main1">{{ house.PRICE_MIN }}-{{
                        house.PRICE_MAX
                      }}
                        &nbsp;</span>
                      <span class="fs-4">만원&nbsp;</span>
                    </h6>
                  </div>
                </div>
              </div>
              <!-- Place following-->
              <div class="pt-5">
                <h4>{{ house.ADDR_FULL_ROAD }}</h4>
              </div>
            </div>
          </div>

          <!-- Location (Map)-->
          <div class="position-relative">
            <DetailMap class="rounded-3" :latitude="house.LATITUDE" :longitude="house.LONGITUDE" />
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
import floorImage from "@/assets/img/floor.png";
import laughImage from "@/assets/img/laugh.png";
import roomImage from "@/assets/img/room.png";
import mapImage from "@/assets/img/map.png";
import DetailMap from '@/common/components/DetailMap.vue';

export default {
  components: {
    DetailMap
  },
  data() {
    const tagsString =
      "관리비 7~52#FIXED|여성전용#FIXED|청소업체|신용카드|현금영수증|개인에어컨|개인화장실";

    const tagsArray = tagsString
      .split("|")
      .map((tag) => tag.replace("#FIXED", "").trim())
      .filter((tag) => tag)
      .map((tag) => `#${tag}`);
    return {
      floorImage,
      laughImage,
      roomImage,
      mapImage,
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
          "https://image.neoflat.net/38wirq8VPRRJ3LZUrqcF0A9RVNY=/240x288/filters:no_upscale():watermark(/resource/gobang.png,center,center,0,20,none)/house/4090/bf533c6a-3608-4e47-84b7-992b0e0e8437.png",
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

<style>
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
  background: #f2ecf9;
  color: #000;
  font-weight: 600;
  padding: 2px 5px;
  margin: 5px 5px;
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
</style>
