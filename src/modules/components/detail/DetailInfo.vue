<template>
    <div class="white-box p-5 mb-4">
        <div class="d-flex justify-content-center h4"><span>서울시 광진구 화양동 144-1</span><span>다세대(빌라/연립)</span></div>
        <div class="features d-flex justify-content-between">
            <div class="feature">
                <img :src="ApartmentIcon" alt="Loan Icon" />
                <span>개인화장실</span>
            </div>
            <div class="feature">
                <img :src="FoodIcon" height="45" width="45" alt="식사" />
                <span>식사제공</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Room Icon" />
                <span>2~3층</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="Area Icon" />
                <span>방 12개</span>
            </div>
            <div class="feature">
                <img :src="ParkingIcon" alt="Parking Icon" />
                <span>주차가능</span>
            </div>
            <div class="feature">
                <img :src="ToiletIcon" alt="Pets Icon" />
                <span>남녀공용</span>
            </div>
        </div>

        <div class="description">
            <p>침대대출가능 모두가능 저융자 안전한방</p>
            <p>복층형 원룸 단독타입(사무 등록 저융자로 공감으로, 크지 않습니다)</p>
            <p>반려동물 협의 (고양이 가능, 장애있는 소형견입주 협의 가능)</p>
            <p>임대인 국세, 저융세 협박 확인 (쉽게 연락가능)</p>
            <p>임대차 보호 특별법에 의해 임차인 보호 특약 대상 많이 넣어드립니다</p>
            <p>훌륭한 전세시장은 침착히 보증보험 가입해서 저희와 보증금 안전하게 지키세요!</p>
            <div class="more-button main1 mt-2" type="button"><strong>소개 더보기</strong></div>
        </div>
    </div>
</template>

<script>
import ApartmentIcon from '@/assets/img/detail/Apartment.png';
import DepartmentIcon from '@/assets/img/detail/Department.png';
import ParkingIcon from '@/assets/img/detail/Parking.png';
import ToiletIcon from '@/assets/img/detail/Toilet.png';
import FoodIcon from '@/assets/img/detail/Food.png';

export default {
    data() {
        return {
            ApartmentIcon,
            DepartmentIcon,
            ParkingIcon,
            ToiletIcon, FoodIcon
        }
    }
}
</script>

<style scoped>
.main1 {
    color: #7747b5;
}

.features {
    padding: 1.5rem 1rem 1.5rem 1rem;
    border-top: solid 1px #d9d9d9;
    border-bottom: solid 1px #d9d9d9;
    margin: 3rem auto 3rem;
}

.features img {
    margin-right: 0.3rem;
}

.description {
    text-align: center;
}
</style>