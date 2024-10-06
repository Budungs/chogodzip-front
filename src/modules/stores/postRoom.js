import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePostRoomStore = defineStore('postRoom', {
    state: () => ({
        category: '',
        progress: 0,
        categorySelected: false,
        basicInfoFilled: false,

        basicInfo: {
            title: '',
            addr: {
                postcode: '',
                address: '',
                detailAddress: '',
            },

            prices: {
                monthlyFeeMin: 0,
                monthlyFeeMax: 0,
                depositFeeMin: 0,
                depositFeeMax: 0,
                isNoDepositFee: false,
                maintenanceFeeMin: 0,
                maintenanceFeeMax: 0,
                isNoMaintenanceFee: false,
            },

            //자취방
            jachi: {
                rentType: '',
                moveIn: {
                    moveInDate: '',
                    canMoveInNow: false,
                },
                minContractPeriod: '',
                room: {
                    type: '',
                    structure: '',
                    count: 0,
                    toiletCount: 0,
                    thisFloor: 0,
                    totalFloor: 0,
                    totalArea: 0,
                    privateArea: 0,
                },
                direction: '',
            },

            //공유주거
            shared: {
                shareType: '',
                minContractPeriod: '',
                age: {
                    ageLimit: 20,
                    isNoAgeLimit: false,
                },
                genderLimit: '',
                singleRoomCount: 0,
                twinRoomCount: 0,
            },

            //개인시설
            privateFacilities: {
                priToilet: false,
                priShower: false,
            },

            //제공 서비스
            services: {
                cashReceipt: false,
                creditCard: false,
                welcomeBox: false,
                freeMeal: false,
            },

            //외국어 응대
            languages: {
                eng: false,
                chn: false,
                jpn: false,
            },

            //기타
            etc: {
                allowMoveIn: false,
                allowForeigner: false,
                allowPet: false,
            },

            //상세 설명, 사진
            desc: '',
            pics: '',
        },

        //대출
        loanInfo: {
            loans: {
                hug: false,
                young100: false,
                young80: false,
                withstand: false,
            },
            mortgage: false,
        },

        //시설
        facilitiesInfo: {
            hot: {
                control: false,
            },
            cool: {
                wallAircon: false,
            },
            day: {
                bed: false,
                closet: false,
                washingM: false,
                desk: false,
                refrig: false,
                chair: false,
                induction: false,
            },
            security: {
                digitLock: false,
                fireKiller: false,
                publicEntrance: false,
            },
        },

        //건물
        buildingInfo: {
            type: '',
            parking: false,
            elevator: false,
        }
    }),

    actions: {
        checkBasicInfo() {
            const { title, addr, prices, jachi, shared } = this.basicInfo;

            const jachiFilled = this.category === 'jachiroom' 
                && title 
                && addr.postcode && addr.address && addr.detailAddress
                && jachi.rentType
                && (jachi.moveIn.moveInDate || jachi.moveIn.canMoveInNow)
                && jachi.minContractPeriod
                && jachi.room.type && jachi.room.structure
                && jachi.direction;

            
            const sharedFilled = this.category == 'sharehouse'
                && title 
                && addr.postcode && addr.address && addr.detailAddress
                && shared.shareType
                && shared.minContractPeriod
                && shared.genderLimit;

            
            this.basicInfoFilled = jachiFilled || sharedFilled;

            if(this.basicInfoFilled) this.progress = 40;
            else this.progress = 20;
        }
    },
});
