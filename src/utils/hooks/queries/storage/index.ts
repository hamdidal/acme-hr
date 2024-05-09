import { AuthType } from './types'

import { STORAGE_AUTH_KEY } from './constants'

export function getTokenFromStorage() {
    const tokenFromLocalStorage = localStorage.getItem(STORAGE_AUTH_KEY)
    if (typeof tokenFromLocalStorage === 'string') {
        const authObject = JSON.parse(tokenFromLocalStorage) as AuthType
        const token = authObject.state.accessToken

        if (token !== undefined && token !== '') {
            return token
        }
    }
    return null
}

export function clearTokenFromStorage() {
    localStorage.removeItem(STORAGE_AUTH_KEY)
    return null
}
