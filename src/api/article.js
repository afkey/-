import request from '@/utils/request.js'

//获取文章列表
export const getArticlesList = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params,
    })
}

//获取频道
export const getArticlesChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}

//删除文章
export const deleteArticlesList = target => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${target}`
    })
}