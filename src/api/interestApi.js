import api from '@/api';

const BASE_URL = '/api/interest';

const headers = { 'Content-Type': 'multipart/form-data' };

export default {

    // async getGosiwonList(params) {
    //     const { data } = await api.get(`${BASE_URL}/gosiwon`, params);
    //     console.log('GOSIWON GET LIST: ', data);
    //     return data;
    // },
    async getInterestList(params) {
        const { data } = await api.get(`${BASE_URL}`,{ params: { userName: params } });
        console.log('Interest List : ',data);
        return data;
    },
    async addInterest(params) {
        console.log('papramd : ',params.userId);
        console.log('uasdfpar : ',params.roomId);
        const { data } = await api.post(`${BASE_URL}/add`, {
            userName: params.userId,
            roomId: params.roomId
        }, { headers });
        console.log('Interest add:', data);
        return data;
    },
    async deleteInterest(params) {
        const {data} = await api.delete(`${BASE_URL}/delete`, {
            userName: params.userId,
            roomId: params.roomId
        });
        console.log('delete dataa : ',data);
        return data;
    }
    
    

}

