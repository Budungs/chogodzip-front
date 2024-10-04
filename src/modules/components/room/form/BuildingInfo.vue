<template>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="room-category">
        <h2 class="h4 mb-4"><i class="fas fa-tags text-primary fs-5 mt-n1 me-2" />건물 정보를 입력해주세요.</h2>

        <div class="row">

            <div class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">건물형태<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-3 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">상가건물</label>
                    </div>
                </div>
            </div>


            <div class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">주차여부<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-6 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">가능</label>
                    </div>
                    <div class="form-check col-lg-6 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">불가능</label>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 mb-3 w-100">
                <div class="form-label pt-3 pb-2 fw-bold">엘리베이터<span class="text-danger">*</span></div>
                <div class="container row w-100">
                    <div class="form-check col-lg-6 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">있음</label>
                    </div>
                    <div class="form-check col-lg-6 justify-content-around">
                        <input class="form-check-input" type="radio" id="period-one" name="ap-business-type">
                        <label class="form-check-label" for="period-one">없음</label>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>