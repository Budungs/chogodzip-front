// 백엔드에서 리뷰 데이터를 DB(USER_REVIEW 테이블의 REVIEW_CONTENT 값)을 통해 받아오고 chatGPT 리뷰 요약
import { ref } from 'vue';
import OpenAI from 'openai';
import axios from 'axios'; // axios를 사용하여 백엔드 API 호출

// chatGPT description
const fetchSummaryReviews = () => {
    const reviewSummary = ref(null);

    const getGPTResponse = async () => {
      // 세션에 저장된 요약 리뷰가 있으면 가져오기
      const storedReviews = sessionStorage.getItem('reviewSummary');

      // 이미 리뷰가 존재하면 중지
      if (storedReviews) {
        reviewSummary.value = JSON.parse(storedReviews);
        console.log("기존 리뷰 데이터가 존재합니다.", reviewSummary.value);
        return;
      } 

        try {
            // 백엔드 API에서 리뷰 데이터를 가져오기
            const res = await axios.get('/api/gptReview/allReview?roomId=1'); // 현재는 roomId가 1이라고 가정
            const reviews = res.data; // 응답 데이터

            // reviewContent만 추출
            const reviewContents = reviews.map(review => review.reviewContent).join('\n');
            
            const openai = new OpenAI({
            apiKey: `${import.meta.env.VITE_GPT_KEY}`,
            dangerouslyAllowBrowser: true,
          })
          
          // DB에서 리뷰 데이터를 받아와서 그 리뷰 데이터를 장점 리뷰 3줄, 단점 리뷰 3줄로 요약해준다.
          const prompt = 
            ` 
            리뷰에 대해서 긍정 리뷰를 3줄로 요약해주고, 부정 리뷰를 3줄로 요약해줘:
            ${reviewContents}
            `;

          // GPT에게 요약 요청
          const response = await openai.chat.completions.create({
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            model: 'gpt-3.5-turbo',
          });

          // GPT의 응답을 저장
          reviewSummary.value = JSON.parse(response.choices[0].message.content);
          sessionStorage.setItem('reviewSummary', JSON.stringify(reviewSummary.value)); //세션에 리뷰 저장

        } catch (error) {
          console.log('chatGPT: 🚨 에러가 발생했습니다.', error.message);
        }
    }
    return { reviewSummary, getGPTResponse };
}

export default fetchSummaryReviews;
