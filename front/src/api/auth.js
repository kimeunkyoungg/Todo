import client from "./client";

export async function login(email, password) {
    const res = await client.post('/auth/login', {email, password})
    return res.data.data

}

export async function signup(email, password, name) {
    const res = await client.post('/auth/signup', {email, password, name})
    return res.data
}


export async function logout() {
    const res = await client.post('/auth/logout')
    return res.data
    
}

