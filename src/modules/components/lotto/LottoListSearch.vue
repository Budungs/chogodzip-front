<template>
    <form class="form-group" style="width:100%; height: 75px; display:flex; flex-direction:row; justify-content:center;">
        <div class="input-group input-group-lg">
            <span class="input-group-text text-muted">
                <i class="fi-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search query...">
        </div>
        
        <select class="form-select" aria-label="Default select example" style="width:100px">
            <option selected>주관</option>
            <option value="1">공공</option>
            <option value="3">민간</option>
        </select>

        <select class="form-select" aria-label="Default select example" style="width:140px">
            <option selected>분류</option>
            <option value="1">청년안심주택</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>

        <select class="form-select" aria-label="Default select example" style="width:120px">
            <option selected>지역</option>
            <option value="1">서울특별시</option>
            <option value="2">경기도</option>
            <option value="3">Three</option>
        </select>

        <select class="form-select" aria-label="Default select example" style="width:100px">
            <option selected>상태</option>
            <option value="1">공고중</option>
            <option value="2">접수예정</option>
            <option value="3">마감</option>
        </select>

        <!-- <div class="range-slider" data-start-min="450" data-min="0" data-max="1000" data-step="1" style="width:500px">
            <div class="range-slider-ui"></div>
            <input type="hidden" class="form-control range-slider-value-min">
        </div> -->

        <button type="button" class="btn btn-translucent-primary ms-auto" style="width:25%; height:80%">검색</button>
    </form>
</template>