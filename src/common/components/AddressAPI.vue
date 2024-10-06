<template>
  <div>
      <input class="form-control" type="text" v-model="postcode" placeholder="우편번호" readonly required />
      <input class="form-control" type="button" @click="execDaumPostcode" value="우편번호 찾기" /><br>
      <input class="form-control" type="text" v-model="address" placeholder="주소" readonly required /><br>
      <input class="form-control" type="text" v-model="detailAddress" placeholder="상세주소" id="detailAddress" required />
      <input class="form-control" type="text" v-model="extraAddress" readonly />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const postcode = ref('');
const address = ref('');
const detailAddress = ref('');
const extraAddress = ref('');

function execDaumPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      let addr = ''; //주소
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress; //도로명 주소
      } else {
        addr = data.jibunAddress; //지번 주소
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ` (${extraAddr})`;
        }
      }

      postcode.value = data.zonecode;
      address.value = addr;
      extraAddress.value = extraAddr;

      setTimeout(() => {
        document.getElementById('detailAddress').focus();
      }, 0);
    }
  }).open();
}

onMounted(() => {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  script.async = true;
  document.head.appendChild(script);
});
</script>