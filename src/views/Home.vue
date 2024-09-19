<template>
    <div class="container">
        <form class="search-bar" action="/search" method="GET">
            <button type="submit">
                <img src="../assets/img/search.png" alt="검색 Icon">
            </button>
            <input type="text" name="query" placeholder="검색어를 입력하세요">`
        </form>
        <!-- Property categories-->
      <div class="container mb-2">
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
        </div>
    </div>
</template>

<style scoped>
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


