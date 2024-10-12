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
    },
    async getGosiwonStatus(location) {
        const { data } = await api.get(`${BASE_URL}/status`, {
            params: { location }
        });
        console.log('status : ', data);
        return data;
    },
    async registReply(params){
        const {data} = await api.post(`${BASE_URL}/regist`, {
            userName : params.userId,
            roomId : params.roomId,
            reply : params.reply
        }, { headers });
        console.log('reply eotrmf : ',data);
        return data;
    }
    



}