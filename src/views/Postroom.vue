<template>
  <div class="container mt-0 mb-md-4 py-5" >
    <div class="row">

      <div class="col-lg-8">
        <!-- Breadcrumb-->
        <nav class="mb-3 pt-md-3" aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">방 내놓기</li>
            <li class="breadcrumb-item active" aria-current="page">매물 정보 등록</li>
          </ol>
        </nav>


        <!-- Title-->
        <div class="mb-4">
          <h1 class="h2 mb-3">매물 정보 등록</h1>
          <p class="mb-0"><span class="text-danger">*</span>표시는 필수 입력 사항입니다.</p>
          <div class="d-lg-none pt-3 mb-2">65% content filled</div>
          <div class="progress d-lg-none mb-4" style="height: .25rem;">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>


        <!-- Basic info-->
        <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
          <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />매물 유형을 선택해주세요.</h2>
          <div class="row">
            <div class="col-sm-6 mb-3">
              <label class="form-label" for="ap-category">매물 유형 <span class="text-danger">*</span></label>
              <select class="form-select" id="ap-category" required>
                <option value="" disabled selected>매물 유형을 선택해주세요.</option>
                <option value="gosiwon">고시원</option>
                <option value="jachiroom">자취방</option>
                <option value="sharehouse">공유주거공간</option>
              </select>
            </div>
          </div>
        </section>



        <!-- 임대 유형 -->
        <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
          <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />이용 정보를 입력해주세요.</h2>
          <div class="row">

            <div class="col-sm-6 mb-3 w-100">
              <div class="form-label pt-3 pb-2">임대 유형<span class="text-danger">*</span></div>
              <div class="container row w-100">
                <div class="form-check col-lg-4 justify-content-around">
                  <input class="form-check-input" type="radio" id="ap-company" name="ap-business-type">
                  <label class="form-check-label" for="ap-company">1일</label>
                </div>
                <div class="form-check col-lg-4">
                  <input class="form-check-input" type="radio" id="ap-individual" name="ap-business-type">
                  <label class="form-check-label" for="ap-individual">1주일</label>
                </div>
                <div class="form-check col-lg-4">
                  <input class="form-check-input" type="radio" id="ap-individual" name="ap-business-type">
                  <label class="form-check-label" for="ap-individual">1개월(월세)</label>
                </div>
              </div>
            </div>


            <div class="col-sm-6 mb-3 w-100">
              <h3 class="form-label pt-3 pb-2">임대 가격</h3>
              <div class="form-label pt-3 pb-2">보증금<span class="text-danger">*</span></div>
              <div class="d-flex align-items-center">
                <div class="w-50 pe-2">
                  <div class="input-group"><span class="input-group-text fs-base">$</span>
                    <input class="form-control range-slider-value-min" type="text">
                  </div>
                </div>
                <div class="text-muted">&mdash;</div>
                <div class="w-50 ps-2">
                  <div class="input-group"><span class="input-group-text fs-base">$</span>
                    <input class="form-control range-slider-value-max" type="text">
                  </div>
                </div>
              </div>

              <div class="form-label pt-3 pb-2">관리비<span class="text-danger">*</span></div>
              <div class="d-flex align-items-center">
                <div class="w-50 pe-2">
                  <div class="input-group"><span class="input-group-text fs-base">$</span>
                    <input class="form-control range-slider-value-min" type="text">
                  </div>
                </div>
                <div class="text-muted">&mdash;</div>
                <div class="w-50 ps-2">
                  <div class="input-group"><span class="input-group-text fs-base">$</span>
                    <input class="form-control range-slider-value-max" type="text">
                  </div>
                </div>
              </div>
           </div>




          </div>

          <!-- 월세 -->
          <label class="form-label" for="ap-price">임대 가격<span class="text-danger">*</span></label>
          <div class="d-sm-flex">
            <select class="form-select w-25 mb-2">
              <option value="day">1일</option>
              <option value="week">1주</option>
              <option value="month">1개월</option>
            </select>
            
            <select class="form-select w-25 mb-2">
              <option value="month">월세</option>
              <option value="year">전세</option>  
            </select>
            <input class="form-control w-100 me-2 mb-2" type="number" id="ap-price" min="200" step="50" required>

          </div>

        </section>


      </div>

      <!-- Progress of completion-->
      <aside class="col-lg-3 offset-lg-1 d-none d-lg-block">
        <div class="sticky-top pt-5">
          <h6 class="pt-5 mt-3 mb-2">65% content filled</h6>
          <div class="progress mb-4" style="height: .25rem;">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <ul class="list-unstyled">
            <li class="d-flex align-items-center">
              <i class="far fa-check-circle text-primary me-2"/>
              <a class="nav-link fw-normal ps-1 p-0" href="#room-category" data-scroll data-scroll-offset="20">매물 유형</a>
            </li>
            <li class="d-flex align-items-center"><i class="far fa-check-circle text-primary me-2"></i><a class="nav-link fw-normal ps-1 p-0" href="#location" data-scroll data-scroll-offset="20">Location</a></li>
            <li class="d-flex align-items-center"><i class="far fa-check-circle text-primary me-2"></i><a class="nav-link fw-normal ps-1 p-0" href="#details" data-scroll data-scroll-offset="20">Property details</a></li>
            <li class="d-flex align-items-center"><i class="far fa-check-circle text-muted me-2"></i><a class="nav-link fw-normal ps-1 p-0" href="#price" data-scroll data-scroll-offset="20">Price</a></li>
            <li class="d-flex align-items-center"><i class="far fa-check-circle text-muted me-2"></i><a class="nav-link fw-normal ps-1 p-0" href="#photos" data-scroll data-scroll-offset="20">Photos / video</a></li>
            <li class="d-flex align-items-center"><i class="far fa-check-circle text-primary me-2"></i><a class="nav-link fw-normal ps-1 p-0" href="#contacts" data-scroll data-scroll-offset="20">Contacts</a></li>
          </ul>
        </div>
      </aside>

    </div>
  </div>
</template>