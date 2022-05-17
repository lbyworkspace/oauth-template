import http from '@/utils/http'

export default {
    getAllUser(){
        return http.get('/system/getAllUser')
    }
}