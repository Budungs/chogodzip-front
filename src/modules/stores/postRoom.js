import router from '@/router';
import axios from 'axios';
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
            title: null,
            addr: {
                postcode: null,
                address: null,
                detailAddress: null,
                roomLat: null, //위도
                roomLong: null, //경도
            },

            price: {
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
                contractMin: null,
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
                res: null,
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
                manlessDeliveryBox: false,
                res: null,
            },

            //외국어 응대
            languages: {
                eng: false,
                chn: false,
                jpn: false,
                res: null,
            },

            //기타
            etc: {
                allowMoveIn: false,
                allowForeigner: false,
                allowPet: false,
                res: null,
            },

            //상세 설명, 사진
            desc: '',
            pics: '',
        },

        //대출
        loanInfo: {
            loans: {
                4: false, //LH HUG
                3: false, //중기청 100
                2: false, //중기청 80
                1: false, //버팀목
                none: false,
                res: null,
            },
            hasMortgage: null,
        },

        //시설
        facilitiesInfo: {
            facilityHeating: {
                center: false,
                personal: false,
                res: null,
            },
            facilityCooling: {
                center: false,
                personal: false,
                res: null,
            },
            facilityLife: {
                bed: false,
                closet: false,
                washingMachine: false,
                desk: false,
                refrig: false,
                chair: false,
                induction: false,
                dryer: false,
                hairDryer: false,
                table: false,
                airCon: false,
                tv: false,
                microwave:false,
                res: null,
            },
            facilitySecurity: {
                digitLock: false,
                fireKiller: false,
                publicEntrance: false,
                cctv: false,
                springCooler: false,
                fireAlarm: false,
                res: null,
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
        // 작성폼 진행상황 카드 표시 확인용
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
                this.facilitiesInfo.facilityHeating.center || this.facilitiesInfo.facilityHeating.personal
                || this.facilitiesInfo.facilityCooling.center || this.facilitiesInfo.facilityCooling.personal
                || this.facilitiesInfo.facilityLife.table || this.facilitiesInfo.facilityLife.closet 
                || this.facilitiesInfo.facilityLife.refrig || this.facilitiesInfo.facilityLife.chair
                || this.facilitiesInfo.facilitySecurity.digitLock || this.facilitiesInfo.facilitySecurity.cctv
                || this.facilitiesInfo.facilitySecurity.fireKiller || this.facilitiesInfo.facilitySecurity.springCooler;

            if(this.facilitiesFilled) this.progress = 80;
            else this.progress = 60;
        },
        checkBuildingInfo() {
            this.buildingFilled = 
                this.buildingInfo.buildingType !== '' && this.buildingInfo.canParking !== '' && this.buildingInfo.hasElevator !== '';
            
            if(this.buildingFilled) this.progress = 100;
            else this.progress = 80;
        },

        //체크리스트 -> 문자열
        convertToString(infoType) {
            let val = '';
            const info = infoType;
            for(let key in info) {
                if(key !== "res" && info[key]) val += `${key}|`;
            }
            return val.trim().substring(0, val.length-1);
        },
        convertTo() {
            this.basicInfo.privateFacilities.res = this.convertToString(this.basicInfo.privateFacilities);
            this.basicInfo.services.res = this.convertToString(this.basicInfo.services);
            this.basicInfo.languages.res = this.convertToString(this.basicInfo.languages);
            this.basicInfo.etc.res = this.convertToString(this.basicInfo.etc);

            this.loanInfo.loans.res = this.convertToString(this.loanInfo.loans);

            this.facilitiesInfo.facilityHeating.res = this.convertToString(this.facilitiesInfo.facilityHeating);
            this.facilitiesInfo.facilityCooling.res = this.convertToString(this.facilitiesInfo.facilityCooling);
            this.facilitiesInfo.facilityLife.res = this.convertToString(this.facilitiesInfo.facilityLife);
            this.facilitiesInfo.facilitySecurity.res = this.convertToString(this.facilitiesInfo.facilitySecurity);
        },

        //유효성 검사
        checkGosiwonValue() {
            if (this.basicInfo.title === null || this.basicInfo.title.trim() === '') throw new Error('이름을 입력해주세요.');
            if (this.basicInfo.addr.postcode === null || this.basicInfo.addr.address === null || this.basicInfo.detailAddress === null) throw new Error('주소를 모두 입력해주세요.');
            if (this.basicInfo.price.priceMin <= 0 || this.basicInfo.price.priceMax <= 0
                || this.basicInfo.depositMin < 0 || this.basicInfo.depositMax < 0
                || this.basicInfo.price.maintenanceFeeMin < 0 || this.basicInfo.price.maintenanceFeeMax < 0
                || this.basicInfo.price.maintenanceFee < 0) throw new Error('올바른 가격을 입력해주세요.');
            if (this.basicInfo.price.priceMin > this.basicInfo.price.priceMax) throw new Error('최소 임대 가격은 최대 임대 가격 이상으로 입력해주세요.');
            if (this.basicInfo.price.depositMin > this.basicInfo.price.depositMax) throw new Error('최대 보증금은 최소 보증금 이상으로 입력해주세요.');
            if (this.basicInfo.price.maintenanceFeeMin > this.basicInfo.price.maintenanceFeeMax) throw new Error('최대 관리비는 최소 관리비 이상으로 입력해주세요.');
            if (this.basicInfo.jachiElse.contractMin === null) throw new Error('최소 계약 기간을 선택해주세요.');
            if (this.basicInfo.jachiElse.age.ageMin < 0 || this.basicInfo.jachiElse.age.ageMax < 0) throw new Error('올바른 연령을 입력해주세요.');
            if (this.basicInfo.jachiElse.age.ageMin > this.basicInfo.jachiElse.age.ageMax) throw new Error('최대 이용 연령은 최소 이용 연령 이상으로 입력해주세요.');
            if (this.basicInfo.genderLimit === null) throw new Error('성별구분을 선택해주세요.');
            if (this.basicInfo.gosiwon.type === null) throw new Error('타입을 선택해주세요.');
            if (this.loanInfo.loans.res === null) throw new Error('가능한 대출 종류를 선택해주세요. 없으면 "없음"을 선택해주세요.');
            if (this.buildingInfo.buildingType === null) throw new Error('건축물 구분을 선택해주세요.');
            if (this.buildingInfo.canParking === null) throw new Error('주차여부를 선택해주세요.');
            if (this.buildingInfo.hasElevator === null) throw new Error('엘리베이터 유무를 선택해주세요.');
        },

        //폼 제출
        async submitForm() {
            try {
                //체크목록 문자열화 (값|값|값)
                this.convertTo();
                this.checkGosiwonValue();

                const response = await axios.post('/api/rooms', {
                    category: this.category,
                    basicInfo: this.basicInfo,
                    loanInfo: this.loanInfo,
                    facilitiesInfo: this.facilitiesInfo,
                    buildingInfo: this.buildingInfo
                });

                if (response.status === 200) {
                    router.push(`/houses/rooms/${response.data}`);
                }
            } catch (err) {
                console.error('>>>>>>>>    ROOM SUBMIT FAILED  (- ^ -)    <<<<<<<<<', err);
                alert(`매물 작성에 실패했습니다. ${err.message}`);
            }
        }
    },
});
