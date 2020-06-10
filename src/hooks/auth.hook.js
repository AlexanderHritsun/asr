import {useState, useCallback, useEffect} from 'react'
import { useHistory } from "react-router-dom";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const history = useHistory();

    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setUserId(id)
        setUserRole(role)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userRole: role
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserRole(null)
        localStorage.removeItem(storageName)
        if (history) history.push('/');
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userRole)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, userRole, ready}
}
