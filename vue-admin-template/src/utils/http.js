import axios from "axios";
import { getToken } from '@/utils/auth';
import store from '@/store'
import { MessageBox, Message } from 'element-ui';

const Axios = axios.create({
    baseURL: process.env.VUE_APP_BASEURL, // api的base_url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 15000 // 请求超时时间
})

//请求拦截器
Axios.interceptors.request.use(
    request => {
        const token = getToken()
        if(token) request.headers['Authorization'] = `Bearer ${token}`
        return request;
    },
    err => {
        console.error(`请求拦截错误: ${err}`)
        return Promise.reject(err)
    })

//响应拦截器
Axios.interceptors.response.use(
    response => {
        console.log('接口' + response.config.url + '请求成功。请求返回值为', response.data)
        return Promise.resolve(response.data);
    }, err => {
        const { status, data: { code , msg } } = err.response
        if (status === 401 && (code === 1001 || code === 1003)) {
            // to re-login
            MessageBox.confirm(`${msg},你可以选择重新登录`, '提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).finally(()=>{
                store.dispatch('user/resetToken').then(() => {
                    window.location.reload() //token清楚掉之后刷新页面，在permission.js中会检测当前是否有token
                })
            })
        }else{
            Message.error(err.response.data)
            return Promise.reject(err.response.data)
        }
    })

export default {

    get(url, params) {
        return Axios.get(url, { params: params })
    },

    post(url, data, config) {
        return Axios.post(url, data, config || {})
    },

    put(url, data, config) {
        return Axios.put(url, data, config || {})
    },

    delete(url, params) {
        return Axios.delete(url, { params: params })
    }
}