import { ref } from 'vue';
import OpenAI from 'openai'

// chatGPT description
const fetchQuizs = () => {
    const quizs = ref(null);

    const getGPTResponse = async () => {

      // 세션에 저장된 퀴즈 조회
      const storedQuizs = sessionStorage.getItem('quizs');

      // 이미 퀴즈가 존재하면 중지
      if (storedQuizs) {
        quizs.value = JSON.parse(storedQuizs);
        console.log("기존 퀴즈 데이터가 존재합니다.", quizs.value);
        return;
      } 

        try {
          const openai = new OpenAI({
            apiKey: `${import.meta.env.VITE_GPT_KEY}`,
            dangerouslyAllowBrowser: true,
          })
      
          const prompt = 
            `
            부동산에 관련된 간단한 퀴즈를 만들어줘.
            형식은 아래 예시에 맞게 작성해줘. agenda는 '청약', '부동산'으로 한정해줘.
            1문제는 부동산, 1문제는 청약에 관한 문제로 만들어줘.
            {"agenda":"전세 거래,"title: "전세보증금 반환을 보호하기 위한 보험은 무엇인가요?","desc": "전세보증금을 보호하기 위해 전세금 반환 보증 보험에 가입할 수 있습니다.","answer": "전세금 반환 보증 보험","category": "부동산"}
            그리고 이 두 JSON을 []배열에 넣어서 돌려줘.
            `;
      
          const response = await openai.chat.completions.create({
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            model: 'gpt-3.5-turbo',
          });

          quizs.value = JSON.parse(response.choices[0].message.content);
          sessionStorage.setItem('quizs', JSON.stringify(quizs.value)); //세션에 퀴즈 저장

        } catch (error) {
          console.log('chatGPT: 🚨 에러가 발생했습니다.', error.message);
        }
    }
    return { quizs, getGPTResponse };
}

export default fetchQuizs;
