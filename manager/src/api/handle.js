import axios from 'axios'
import router from '../router'
import { BASE_URL } from '../constants'

axios.defaults.timeout = 6000
axios.defaults.withCredentials = true
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },

    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                case 403:
                    setTimeout(() => {
                        router.replace({
                            path: '/',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000)
                    break

                case 404:
                    break
            }
            return Promise.reject(error.response)
        }
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}, responseType = 'json') {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            responseType
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function deletes (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}
