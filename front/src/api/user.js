import client from "./client"

export async function getUserInfo() {
    const res = await client.get('/users/me')
    return res.data.data
    
}