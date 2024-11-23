import { ref } from 'vue';
import OpenAI from 'openai';
import axios from 'axios'; // axios를 사용하여 백엔드 API 호출

const fetchSummaryReviews = (roomId) => {
  const reviewSummary = ref(null);

  const getGPTResponse = async () => {
    try {
      // 백엔드 API에서 리뷰 데이터를 가져오기
      const res = await axios.get(`/api/gptReview/allReview?roomId=${roomId}`);
      const reviews = res.data;

      // reviewContent만 추출
      const reviewContents = reviews.map(review => review.reviewContent).join('\n');

      const openai = new OpenAI({
        apiKey: `${import.meta.env.VITE_GPT_KEY}`,
        dangerouslyAllowBrowser: true,
      });

      // GPT에게 요약 요청
      const prompt = `
        아래 리뷰에 대해서 긍정 리뷰를 3줄로 요약해주고, 부정 리뷰를 3줄로 요약해줘:
        ${reviewContents}
        긍정 리뷰 결과를 출력할 때는 '긍정 리뷰 요약 결과:' 로 시작하도록 해주고, 부정 리뷰 결과를 출력할 때는 '부정 리뷰 요약 결과:' 로 시작하도록 해줘.
      `;
      // console.log("질의 내용 : " + prompt);

      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });

      // GPT의 응답을 텍스트로 처리
      reviewSummary.value = response.choices[0].message.content;
      // console.log("응답 내용 : " + reviewSummary.value);

    } catch (error) {
      console.log('chatGPT: 🚨 에러가 발생했습니다.', error.message);
    }
  };

  return { reviewSummary, getGPTResponse };
};

export default fetchSummaryReviews;
