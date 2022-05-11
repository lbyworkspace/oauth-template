import http from '@/utils/http'

export default {
    login(username,password){
        return http.post(`/oauth/token?grant_type=password&username=${username}&password=${password}`,null,{headers: { 'Authorization': 'Basic YzE6MTIzNDU2' }})
    },

    getInfo(token){
        return http.get('/system/getInfo',{token:token})
    }
}