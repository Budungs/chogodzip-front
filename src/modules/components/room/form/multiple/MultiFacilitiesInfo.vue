<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
        <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />공용 시설 정보를 입력해주세요.</h2>

        <div class="row">

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">난방시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">중앙시설</label>
                    </div>
                  </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">세탁시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">세탁기</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">건조기</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">건조대</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">다리미</label>
                    </div>
                  </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">주방시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">인덕션</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">정수기</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">전기포트</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">조리도구</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">전자레인지</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">커피머신</label>
                    </div>
                  </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">생활시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">WIFI</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">비데</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">드라이기</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">공용에어컨</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">공용화장실</label>
                    </div>
                  </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">안전시설</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">CCTV</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">스프링쿨러</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">디지털도어락</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">소화기</label>
                    </div>
                  </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">별도 전용공간</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">휴게실</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">테라스</label>
                    </div>
                  </div>
                </div>
            </div>


            <div class="mb-4">
                <label class="form-label d-block fw-bold mb-2 pb-1">제공 비품</label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">라면</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">조미료</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">세탁세제</label>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="wifi">
                      <label class="form-check-label" for="wifi">휴지</label>
                    </div>
                  </div>
                </div>
            </div>

        </div>
    </section>
</template>