import api from '@/api';

const BASE_URL = '/api/map';

const headers = { 'Content-Type': 'multipart/form-data' };

export default {

    async getGosiwonList(params) {
        const { data } = await api.get(`${BASE_URL}/gosiwon`, params);
        console.log('GOSIWON GET LIST: ', data);
        return data;
    },
    async getList(params){
        const { data } = await api.get(`${BASE_URL}/filter`,params);
        console.log('filter Gosiwon : ', data);
        return data;
    }



}

