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

export { postSignup, postLogin }
