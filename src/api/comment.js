import request from '@/utils/request.js'


//获取文章列表
export const getArticleComment = (params) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params,
    })
}

//修改文章评论状态
export const changeCommentStatus = (article) => {
    return request({
        method: 'PUT',
        url: '/mp/v1_0/comments/status',
        params: {
            article_id: article.id
        },
        data: {
            allow_comment: article.comment_status
        }
    })
}

