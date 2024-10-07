<template>
    <div class="white-box p-5 mb-4">
        <div class="d-flex justify-content-center h4"><span>서울시 광진구 화양동 144-1</span><span>다세대(빌라/연립)</span></div>
        <div class="features d-flex justify-content-between">
            <div class="feature">
                <img :src="PaperIcon" alt="전세대출" />
                <span>전세대출가능</span>
            </div>
            <div class="feature">
                <img :src="BankIcon" alt="융자" />
                <span>저융자</span>
            </div>
            <div class="feature">
                <img :src="DepartmentIcon" alt="방구조" />
                <span>원룸(복층형)</span>
            </div>
            <div class="feature">
                <img :src="RoomIcon" alt="평수" />
                <span>8평(27m2)</span>
            </div>
            <div class="feature">
                <img :src="ParkingIcon" alt="주차" />
                <span>주차가능</span>
            </div>
            <div class="feature">
                <img :src="AnimalIcon" alt="애완동물" />
                <span>동물가능</span>
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
import RoomIcon from '@/assets/img/detail/Room.png';
import PaperIcon from '@/assets/img/detail/Paper.png';
import ParkingIcon from '@/assets/img/detail/Parking.png';
import DepartmentIcon from '@/assets/img/detail/Department.png';
import BankIcon from '@/assets/img/detail/Bank.png';
import AnimalIcon from '@/assets/img/detail/Animal.png';

export default {
    data() {
        return {
            RoomIcon,
            PaperIcon,
            ParkingIcon,
            DepartmentIcon,
            BankIcon,
            AnimalIcon
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