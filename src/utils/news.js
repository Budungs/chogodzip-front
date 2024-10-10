import { ref } from "vue";
import axios from "axios";

const fetchNews = () => {
    const items = ref([]);

    const getNewsList = async () => {
        items.value = [];

        const URL = `/v1/search/news.json?query=${encodeURI('청약|경제|부동산')}&start=1&display=5&sort=date`;
        const clientId = 'lG94EpCjQ7J27UoXofnQ';
        const clientSecret = 'TxQUgnGbjp';

        try {
            const response = await axios.get(URL, {
                headers: {
                    Accept: "application/json",
                    "X-Naver-Client-Id": clientId,
                    "X-Naver-Client-Secret": clientSecret,
                },
            });

            //카테고리 분류
            for (let i = 0; i < Math.min(5, response.data.items.length); i++) {
                let words = '';
                const wordsArr = ['부동산', '청약', '아파트', '전세', '월세', '매매', '보증금', '빌라', '주택'];
                for(let word in wordsArr) {
                    if(response.data.items[i].title.includes(word)) {
                        words += '부동산'; break;
                    }
                }
                if(words.trim() === '') words = '경제';

                //html태그 제거
                const title = document.createElement('div');
                title.innerHTML = response.data.items[i].title;
                const cleanedTitle = title.innerText || title.textContent;

                const item = {
                    category: words,
                    title: cleanedTitle,
                    href: response.data.items[i].link,
                    date: response.data.items[i].pubDate,
                };
                
                items.value.push(item);
            }
        } catch (err) {
            console.error("뉴스 목록을 가져오는 데 실패했습니다:", err);
        }
    }

    return {
        items, getNewsList,
    }
};

export default fetchNews;
