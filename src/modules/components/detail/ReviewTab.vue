<template>
    <div class="ai-card">
        <div class="container">
            <h3 class="title mb-3" style="margin-left:15px;">
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
    </div>
    <div class="container">
        <div class="mb-5">
            <div class="tab-content pt-2">
                <div class="tab-pane fade show active" id="reviews-about-you" role="tabpanel">

                    <div class="mb-3 position-relative pt-2 pb-2">
                        <input style="height: 100px; width: 100%;" class="form-control" id="input-normal" type="text">
                        <button class="pt-2 btn"
                            style="background: #68C9CB; color:white; position: absolute; right: 10px; bottom: 15px; padding: 5px 10px; font-size: 0.9rem;"
                            type="submit">작성</button>
                    </div>


                    <div class="mb-4 pb-4 border-bottom" v-for="review in 3" :key="review">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center pe-2"><img class="rounded-circle me-1"
                                    src="https://i.namu.wiki/i/Vj5qbEFSnNirgU_WzuKbQmLd20hbM6QyNGHb8f87wB4iUuMA-OliDHoQMBnxu7jSowmBl5R-wBKXIb5Voe1bxw.webp"
                                    width="40" height="40" alt="Avatar"
                                    style="width:50px !important; height:50px !important;">
                                <div class="ps-2">
                                    <h6 class="fs-base mb-0">말리부</h6><span class="star-rating"></span>
                                </div>
                            </div><span class="text-muted fs-sm">Jan 17, 2021</span>
                        </div>
                        <p style="margin-left:4rem;">집주인이 친절하세요. 이번에 전등 나갔을 때도 친절히 수정 도와주셨어요 ! 근처 공원이 있는 점도 마음에 듭니다.</p>

                    </div>

                    <nav class="mt-2" aria-label="Reviews pagination">
                        <ul class="pagination">
                            <li class="page-item d-sm-none"><span class="page-link page-link-static">1 /
                                    5</span></li>
                            <li class="page-item active d-none d-sm-block" aria-current="page"><span
                                    class="page-link">1<span class="visually-hidden">(current)</span></span>
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
export default {
    data() {
        return {
            activeTab: 'pros',
        }
    }
}
</script>

<style scoped>
.ai-card {
    background-color: #f7f2fc;
    padding-top: 4rem;
    padding-bottom: 4rem;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 2rem;
}


.toggle-bar {
    margin-top: 1rem;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
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
    color: white;
}

button:not(.active):hover {
    background-color: #ddd;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

ul {
    list-style: none;
}

li {
    font-size: medium;
    margin-bottom: 20px;
}
</style>