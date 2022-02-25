const BASE_URL = 'http://127.0.0.1:8000/api/'
const postSignup = async (body) => {
    const url = BASE_URL + 'auth/register'

    console.log(Object.fromEntries(body.entries()))
    try {
        const request = await fetch(url, {
            method: 'POST',
            body: body,
        })

        const data = await request.json()

        console.log(data)
        console.log(request)
        return { data, request }
    } catch (e) {
        return e
    }
}

const postLogin = async (body) => {
    const url = BASE_URL + 'auth/login'

    console.log(body)
    try {
        const request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await request.json()

        console.log('data', data)
        console.log('request', request)

        return { data, request }
    } catch (e) {
        return e
    }
}

const getMe = async (token) => {
    const url = BASE_URL + 'auth/me'

    try {
        const request = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await request.json()

        return { data, request }
    } catch (e) {
        return e
    }
}

const updateMe = async ({ token, body }) => {
    const url = BASE_URL + 'auth/update'
    try {
        const request = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await request.json()

        console.log('data', data)
        console.log('request', request)

        return { data, request }
    } catch (e) {
        return e
    }
}

const getAllUsers = async (token) => {
    const url = BASE_URL + 'auth/list'

    try {
        const request = await fetch(url)
        const data = await request.json()

        console.log(request)
        console.log(data)
        return { data, request }
    } catch (e) {
        return e
    }
}

const updateUser = async ({ id, token, body }) => {
    const url = BASE_URL + `auth/update/${id}`
    try {
        const request = await fetch(url, {
            method: 'POST',
            body: body,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await request.json()

        console.log('data', data)
        console.log('request', request)

        return { data, request }
    } catch (e) {
        return e
    }
}

const deleteUser = async ({ id, token }) => {
    const url = BASE_URL + `auth/destroy/${id}`

    try {
        const request = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await request.json()

        console.log('data', data)
        console.log('request', request)

        return { data, request }
    } catch (e) {
        return e
    }
}

export { postSignup, postLogin, getMe, updateMe, getAllUsers, updateUser, deleteUser }
