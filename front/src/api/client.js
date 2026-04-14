import axios from "axios";

const client = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },

})

// 요청 인터셉터 - 요청마다 토큰 함께
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if(token) {
        config.headers.Authorization= `Bearer ${token}`
    }
    
    return config
})

// 응답 인터셉터 - 에러 메시지 통일
client.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || '요청에 실패했습니다'
        return Promise.reject(new Error(message))
    }
)

export default client