const saveLocalStorage = ({ key, value }) => {
    window.localStorage.setItem(key, value)
}

const getLocalStorage = (key) => {
    return window.localStorage.getItem(key)
}

const removeLocalStorage = () => {
    window.localStorage.clear()
}

export { getLocalStorage, saveLocalStorage, removeLocalStorage }
