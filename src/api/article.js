import request from '@/utils/request.js'

//获取文章列表
export const getArticlesList = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params,
    })
}

//获取文章频道
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


//获取发布频道
export const getPubChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}


//发布文章
export const addArticle = (data, draft = false) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            draft: draft,
        },
        data,
    })
}




//获取指定文章
export const getArticle = (article_id) => {
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${article_id}`,
    })
}
//编辑文章
export const editArticle = (data,article_id,draft=false) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${article_id}`,
        params: {
            draft
        },
        data,
    })
}