import request from '@/utils/request.js'

export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        headers: {
            Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjEzMjIyNDIsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.ZDLhO9AFBNVqat6gwyU9DFOnrI04P9_F5KQ4lv0NP2E'
        }
    })
}