import request from '@/utils/request.js'

//获取用户资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
    })
}

//编辑用户资料
export const updateUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/profile',
        data,
    })
}

//上传图片
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/photo',
        data,
    })
}