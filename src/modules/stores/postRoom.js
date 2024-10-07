import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePostRoomStore = defineStore('postRoom', {
    state: () => ({
        category: null,
        progress: 0,
        categorySelected: false,
        basicInfoFilled: false,
        loanInfoFilled: false,
        facilitiesFilled: false,
        buildingFilled: false,

        basicInfo: {
            title: '',
            addr: {
                postcode: null,
                address: null,
                detailAddress: '',
            },

            prices: {
                priceMin: 0,
                priceMax: 0,
                depositMin: 0,
                depositMax: 0,
                isNoDepositFee: false,
                maintenanceFeeMin: 0,
                maintenanceFeeMax: 0,
                maintenanceFee: 0, //고시원
                isNoMaintenanceFee: false,
            },

            //자취방
            jachi: {
                rentType: null,
                moveIn: {
                    moveInDate: null,
                    canMoveInNow: false,
                },
                contractMin: 0,
                room: {
                    roomType: null,
                    roomStructure: null,
                    roomCnt: 0,
                    toiletCnt: 0,
                    thisFloor: 0,
                    totalFloor: 0,
                    totalArea: 0,
                    privateArea: 0,
                },
                roomDirection: null,
            },

            //자취 외 공통
            jachiElse: {
                contractMin: 0,
                age: {
                    ageMin: 0,
                    ageMax: 0,
                    isNoAgeLimit: false,
                },
                genderLimit: null,
            },

            //고시원
            gosiwon: {
                type: null,
            },

            //공유주거
            shared: {
                shareType: null,
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
                securityCom: false,
                cleanCom: false,
                disinfectCom: false,
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
                none: false,
            },
            hasMortgage: null,
        },

        //시설
        facilitiesInfo: {
            facilityHeating: {
                control: false,
            },
            facilityCooling: {
                wallAircon: false,
            },
            facilityLife: {
                bed: false,
                closet: false,
                washingM: false,
                desk: false,
                refrig: false,
                chair: false,
                induction: false,
            },
            facilitySecurity: {
                digitLock: false,
                fireKiller: false,
                publicEntrance: false,
            },
        },

        //건물
        buildingInfo: {
            buildingType: null,
            canParking: null,
            hasElevator: null,
        }
    }),

    actions: {
        checkBasicInfo() {
            const { title, addr, prices, jachi, jachiElse, shared, gosiwon } = this.basicInfo;

            const goshiFilled = this.category === 'gosiwon'
                && title 
                && addr.postcode && addr.address && addr.detailAddress
                && jachiElse.contractMin
                && gosiwon.type;

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
                && jachiElse.contractMin
                && jachiElse.genderLimit;

            
            this.basicInfoFilled = goshiFilled || jachiFilled || sharedFilled;

            if(this.basicInfoFilled) this.progress = 40;
            else this.progress = 20;
        },

        checkLoanInfo() {
            this.loanInfoFilled = 
                this.loanInfo.loans.hug || this.loanInfo.loans.young100 || this.loanInfo.loans.young80
                || this.loanInfo.loans.withstand || this.loanInfo.loans.none;

            if(this.loanInfoFilled) this.progress = 60;
            else this.progress = 40;
        },

        checkFacilitiesInfo() {
            this.facilitiesFilled = 
                this.facilitiesInfo.facilityHeating.control || this.facilitiesInfo.facilityCooling.wallAircon 
                || this.facilitiesInfo.facilityLife.bed || this.facilitiesInfo.facilityLife.closet 
                || this.facilitiesInfo.facilityLife.refrig || this.facilitiesInfo.facilityLife.chair
                || this.facilitiesInfo.facilitySecurity.digitLock;

            if(this.facilitiesFilled) this.progress = 80;
            else this.progress = 60;
        },

        checkBuildingInfo() {
            this.buildingFilled = 
                this.buildingInfo.buildingType !== '' && this.buildingInfo.canParking !== '' && this.buildingInfo.hasElevator !== '';
            
            if(this.buildingFilled) this.progress = 100;
            else this.progress = 80;
        },
    },
});
