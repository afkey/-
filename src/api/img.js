import request from '@/utils/request.js'

//获取全部图片
export const getImage = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        params,
    })
}

//收藏图片素材
export const collectImage = (collect, imgID) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/user/images/${imgID}`,
        data: {
            collect,
        }
    })
}

//删除图片素材
export const deleteCollectImage = (imgID) => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/user/images/${imgID}`, 
    })
}

