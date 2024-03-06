import request from '@/utils/request'

export function getAppInit(device_id, client) {
    return request({
        url: '/App/init',
        method: 'post',
        data: {
            "device_id": device_id,
            "client": client
        }
    })
}

export function getDashboard() {
    return request({
        url: '/Account/dashboard',
        method: 'post'
    })
}