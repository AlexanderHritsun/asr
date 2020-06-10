import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {Spinner} from "../../components/Loader";
import {UserCard} from "../../components/User";
import {AuthContext} from "../../context/AuthContext";

function Users() {
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const deleteUser = useCallback(async (id) => {
        try {

            await request(`/api/users/${id}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            fetchUsers()
        } catch (e) {}
    }, [token, request])

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/users', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className = "user">
            {!loading && <UserCard users={users} deleteUser={deleteUser} />}
        </div>
    )
}

export default Users