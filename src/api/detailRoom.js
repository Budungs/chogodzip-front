import api from '@/api';

const BASE_URL = '/api/detail';

const headers = { 'Content-Type': 'multipart/form-data' };

export default {

    // async getGosiwonList(params) {
    //     const { data } = await api.get(`${BASE_URL}/gosiwon`, params);
    //     console.log('GOSIWON GET LIST: ', data);
    //     return data;
    // }

    async getOneGosiwon(no){
        const {data} = await api.get(`${BASE_URL}/gosiwons/${no}`);
        console.log('ONE GOSIWON : ', data);
        return data;
    },
    async getAllReview(no){
        const {data} = await api.get(`${BASE_URL}/review/${no}`);
        console.log('review : ',data);
        return data;
    }



}