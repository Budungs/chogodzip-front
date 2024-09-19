<template>
  <div class="container">
    <!-- Page content-->
    <!-- Page header-->
    <section class="container">
      <!-- Nav pills-->
      <ul class="nav nav-pills border-bottom pb-3">
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center active">상세페이지</a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center">리뷰</a>
        </li>
      </ul>
    </section>
    <!-- Page content -->
    <section class="container pb-5 mb-md-4">
      <div class="row">
        <!-- Left column-->
        <div class="col-md-7 mb-md-0 mb-4 pb-md-0 pb-2">
          <img :src="house.TITLE_IMAGE" alt="House Image" class="house-image" />

          <div class="mb-4 pb-md-3 mt-4">
            <h2
              class="h4"
              v-for="subway in house.nearSubways[0]"
              :key="subway.NAME"
            >
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
              <div
                class="mb-3 pb-3 pt-3 border-bottom d-flex justify-content-around"
              >
                <div class="text-center">
                  <img
                    width="70"
                    height="70"
                    :src="floorImage"
                    alt="Floor Image"
                    class="pb-2"
                  />
                  <h6>총 {{ house.FLOOR }}층</h6>
                </div>
                <div class="text-center">
                  <img
                    width="70"
                    height="70"
                    :src="roomImage"
                    alt="Room Image"
                    class="pb-2"
                  />
                  <h6>총 {{ house.ROOM_CNT }}개의 방</h6>
                </div>
                <div class="text-center">
                  <img
                    width="70"
                    height="70"
                    :src="laughImage"
                    alt="Laugh Image"
                    class="pb-2"
                  />
                  <h6>{{ house.GENDER_TYPE_NM }}</h6>
                </div>
              </div>
              <!-- Place pricing-->
              <div class="pb-3 pt-3 border-bottom">
                <div class="row row-cols-1">
                  <div class="col">
                    <h6 class="h5 mb-2">
                      <span class="fs-4">보증금&nbsp;</span>
                      <span class="fs-4 main1"
                        >{{ house.DEPOSIT_MIN }}-{{
                          house.DEPOSIT_MAX
                        }}&nbsp;</span
                      >
                      <span class="fs-4">만원&nbsp;</span>
                    </h6>
                    <h6 class="h5 mb-0">
                      <span class="fs-4">월세&nbsp;</span>
                      <span class="fs-4 main1"
                        >{{ house.PRICE_MIN }}-{{
                          house.PRICE_MAX
                        }}
                        &nbsp;</span
                      >
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
            <img class="rounded-3" alt="Map" :src="mapImage" />
            <div
              class="d-flex w-100 h-100 flex-column align-items-center justify-content-center position-absolute top-0 start-0"
            >
              <!-- <a
                class="btn btn-primary rounded-pill stretched-link"
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2423.924340088787!2d13.428504251724927!3d52.58906113876177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a85284201593ab%3A0x28af69e02ce0e2fc!2sBusinesshotel%20Berlin!5e0!3m2!1sru!2sua!4v1618908622013!5m2!1sru!2sua"
                data-iframe="true"
                data-bs-toggle="lightbox"
                ><i class="fi-route me-2"></i>Get directions</a
              > -->
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
import floorImage from "../assets/img/floor.png";
import laughImage from "../assets/img/laugh.png";
import roomImage from "../assets/img/room.png";
import mapImage from "../assets/img/map.png";

export default {
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
.container {
  padding: 20px;
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
