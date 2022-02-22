const saveLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
}

const getLocalStorage = () => {
    return window.localStorage.getItem('token')
}

const removeLocalStorage = () => {
    window.localStorage.removeItem('token')
}

export { getLocalStorage, saveLocalStorage, removeLocalStorage }
