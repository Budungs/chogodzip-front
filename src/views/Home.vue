<template>
    <div class="container">
        <form class="search-bar" action="/search" method="GET">
            <button type="submit">
                <img src="../assets/img/search.png" alt="검색 Icon">
            </button>
            <input type="text" name="query" placeholder="검색어를 입력하세요">`
        </form>
        <!-- Property categories-->
        <!-- <div class="container mb-2">
        <div class="row row-cols-lg-2 row-cols-sm-3 row-cols-2 g-1 g-xl-4">
          <div class="col"><a class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center" href="/houses/maps/room">
              <div class="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i class="fi-real-estate-house"></i></div>
              <h3 class="icon-box-title fs-base mb-0">자취방</h3></a></div>
          <div class="col"><a class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center" href="/houses/maps/gosiwons">
              <div class="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i class="fi-apartment"></i></div>
              <h3 class="icon-box-title fs-base mb-0">고시원</h3></a></div>
          <div class="col"><a class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center" href="/houses/maps/sharehouses">
              <div class="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i class="fi-shop"></i></div>
              <h3 class="icon-box-title fs-base mb-0">공유 주거 공간</h3></a></div>
          <div class="col"><a class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center" href="/lottos/calendars">
              <div class="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i class="fi-rent"></i></div>
              <h3 class="icon-box-title fs-base mb-0">청약</h3></a></div>
          </div>
        </div> -->

        <br>

        <div class="main-options">
            <router-link class="option" to="/houses/maps/room">
                    <img src="../assets/img/jachi.png" alt="자취방 Icon">
                    <div>
                        <strong>자취방</strong>
                        원룸, 투룸+, 주택/빌라, 오피스텔 모두 한눈에!
                    </div>
            </router-link>

            <router-link class="option" to="/houses/maps/gosiwons">
                
                    <img src="../assets/img/gosi.png" alt="고시원 Icon">
                    <div>
                        <strong>고시원</strong>
                        잠깐 머물 곳이 없나요? 고시원 전용 매물 찾기
                    </div>
                
            </router-link>
            
            <router-link class="option" to="/houses/maps/sharehouses">
                    <img src="../assets/img/gongu.png" alt="공유 주거 공간 Icon">
                    <div>
                        <strong>공유 주거 공간</strong>
                        비싼 월전세가 걱정된다면, 쉐어하우스, 코리빙하우스 전용 매물
                    </div>
            </router-link>
            
            <router-link class="option" to="/subscriptions/calendars">
                    <img src="../assets/img/chungyak.png" alt="청약 Icon">
                    <div>
                        <strong>청약</strong>
                        복잡하고 어려운 청약 정보, 쉽고 간결하게!
                    </div>
            </router-link>
        </div>

        <br><br><br><br>
        <div class="title">초갓집 AI가 딱 맞는 <span style="color: #7747B5;">서초동</span> 매물을 추천했어요 🤖</div>
        <div class="subtitle">서초동 | 월세 무제한 | 전세 무제한 검색 조건으로 추천된 매물입니다.</div>
        <div class="more-listings">
            <a href="#">더 많은 방 보기<span class="arrow">➔</span></a>
        </div>

        <br><br>

        <div class="cards">
            <div class="card">
                <div class="card-second">
                    <img src="../assets/img/kbkb.png" alt="매물 사진">
                    <div class="card-info">
                        <div class="label">원룸</div>
                        <div class="price">월세 2000/55</div>
                        <div class="desc">2층, 5평, 관리비 10만<br>깔끔하고 공간 좋은 오픈형 원룸</div>
                        <div class="location">서울특별시 강남구 역삼동</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-second">
                    <img src="../assets/img/kbkb.png" alt="매물 사진">
                    <div class="card-info">
                        <div class="label">원룸</div>
                        <div class="price">월세 2000/55</div>
                        <div class="desc">2층, 5평, 관리비 10만<br>깔끔하고 공간 좋은 오픈형 원룸</div>
                        <div class="location">서울특별시 강남구 역삼동</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-second">
                    <img src="../assets/img/kbkb.png" alt="매물 사진">
                    <div class="card-info">
                        <div class="label">원룸</div>
                        <div class="price">월세 2000/55</div>
                        <div class="desc">2층, 5평, 관리비 10만<br>깔끔하고 공간 좋은 오픈형 원룸</div>
                        <div class="location">서울특별시 강남구 역삼동</div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-second">
                    <img src="../assets/img/kbkb.png" alt="매물 사진">
                    <div class="card-info">
                        <div class="label">원룸</div>
                        <div class="price">월세 2000/55</div>
                        <div class="desc">2층, 5평, 관리비 10만<br>깔끔하고 공간 좋은 오픈형 원룸</div>
                        <div class="location">서울특별시 강남구 역삼동</div>
                    </div>
                </div>
            </div>


            <div class="card">
                <div class="card-second">
                    <img src="../assets/img/kbkb.png" alt="매물 사진">
                    <div class="card-info">
                        <div class="label">원룸</div>
                        <div class="price">월세 2000/55</div>
                        <div class="desc">2층, 5평, 관리비 10만<br>깔끔하고 공간 좋은 오픈형 원룸</div>
                        <div class="location">서울특별시 강남구 역삼동</div>
                    </div>
                </div>
            </div>
        </div>

        <br><br><br><br><br>
        <!-- third -->
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <!-- card -->
                <div class="card">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3 lh-1">
                            <div>
                                <span class="fs-6 text-uppercase fw-semibold">공고중</span>
                            </div>
                            <div>
                                <span class="fe fe-shopping-bag fs-3 text-primary"></span>
                            </div>
                        </div>
                        <h2 class="fw-bold mb-1">
                            <p style="text-align: right;"><span style="color: purple;">120</span>건</p>
                        </h2>
                        <!-- <span class="text-success fw-semibold"><i class="fe fe-trending-up me-1"></i>+20.9$</span>
                    <span class="ms-1 fw-medium">Number of sales</span> -->
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <!-- card -->
                <div class="card">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3 lh-1">
                            <div>
                                <span class="fs-6 text-uppercase fw-semibold">접수중</span>
                            </div>
                            <div>
                                <span class="fe fe-book-open fs-3 text-primary"></span>
                            </div>
                        </div>
                        <h2 class="fw-bold mb-1">
                            <p style="text-align: right;"><span style="color: purple;">10</span>건</p>
                        </h2>
                        <!-- <span class="text-danger fw-semibold">120+</span>
                    <span class="ms-1 fw-medium">Number of pending</span> -->
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12">
                <!-- card -->
                <div class="card">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-3 lh-1">
                            <div>
                                <span class="fs-6 text-uppercase fw-semibold">오늘 등록</span>
                            </div>
                            <div>
                                <span class="fe fe-users fs-3 text-primary"></span>
                            </div>
                        </div>
                        <h2 class="fw-bold mb-1">
                            <p style="text-align: right;"><span style="color: purple;">22</span>건</p>
                        </h2>
                        <!-- <span class="text-success fw-semibold"><i class="fe fe-trending-up me-1"></i>+1200</span>
                    <span class="ms-1 fw-medium">Students</span> -->
                    </div>
                </div>
            </div>
        </div>  
    </div>

    <br><br><br><br><br><br><br><br><br><br>

</template>

<style scoped>
@import "../assets/css/mainPage.css";
.search-bar {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
}

.search-bar input {
    width: 100%;
    padding: 10px 20px 10px 45px;
    font-size: 1.2rem;
    border: 2px solid var(--main1); 
    border-radius: 10px;
    outline: none;
}

.search-bar button {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-90%);
    background: none;
    border: none;
    cursor: pointer;
}

.search-bar button img {
    width: 20px;
    height: 20px;
}
</style>


