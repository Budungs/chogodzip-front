<template>
    <div class="container">
        <LottoTab />
        <br />
        <br />
        <!-- 
        <form class="search-bar" action="/search" method="GET">
            <button type="submit">
                <img src="../../assets/img/search.png" alt="검색 Icon">
            </button>
            <input type="text" name="query" placeholder="검색어를 입력하세요">
        </form> -->
        <div>
            <div v-for="(item, index) in titles" :key="index">
                <article class="d-flex align-items-start">
                    <a class="d-none d-sm-block flex-shrink-0 me-sm-4 mb-sm-0 mb-3"
                        href="real-estate-blog-single.html"><img class="rounded-3"
                            src="https://img.hankyung.com/photo/202409/01.38059034.1.jpg" width="200"
                            style="margin-right: 10px;" alt="Blog post"></a>
                    <div style="width: 100%; margin-top:2px;">
                        <h1 class="mb-2"><a class="nav-link" :href="links[index]">
                                <div style="font-size: 25px; margin-bottom: 16px;" v-html="item"></div>
                            </a></h1>
                        <div class="mb-2" style="font-size: 20px;" v-html="descriptions[index]"></div><a
                            class="nav-link nav-link-muted d-inline-block me-3 p-0 fs-xs fw-normal" href="#">{{
                                lastBuildDate[index] }}</a>
                    </div>
                </article>
                <hr class="text-dark opacity-10 my-4">
            </div>
        </div>
    </div>
</template>

<script>
import LottoTab from '@/modules/components/lotto/LottoTab.vue';
import axios from "axios";

export default {
    components: {
        LottoTab
    },
    data() {
        return {
            NewsListNaver: [],
            titles: [],
            description: [],
            links: [],
            lastBuildDate: [],
        }
    },
    mounted() {
        this.getNewsList();
    },
    methods: {
        getNewsList() {
            this.titles = []
            this.descriptions = []
            this.links = []
            this.lastBuildDate = []
            const URL =
                `/v1/search/news.json?query=${encodeURI('청약')}&start=1&display=99&sort=sim`;
            const clientId = 'lG94EpCjQ7J27UoXofnQ';
            const clientSecret = 'TxQUgnGbjp';
            axios
                .get(URL, {
                    headers: {
                        Accept: "application/json",
                        "X-Naver-Client-Id": clientId,
                        "X-Naver-Client-Secret": clientSecret,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    // this.NewsListNaver = this.NewsListNaver.concat(response.data.items);
                    // console.log(this.NewsListNaver);
                    for (let i = 0; i < 10 && i < response.data.items.length; i++) {
                        this.titles.push(response.data.items[i].title);
                        this.descriptions.push(response.data.items[i].description);
                        this.links.push(response.data.items[i].originallink);
                        this.lastBuildDate.push(response.data.lastBuildDate);
                    }
                });
        },
    }
}
</script>

<style scoped>
.search-bar {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 20px auto 70px;
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
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
}

.search-bar button img {
    width: 20px;
    height: 20px;
}
</style>