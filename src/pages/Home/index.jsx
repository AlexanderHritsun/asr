import React, {useCallback, useContext, useEffect, useState} from "react";
import { Card, Button } from 'react-bootstrap';
import {Spinner} from "../../components/Loader";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {PostCard} from "../Posts/PostCard";

function Home() {

    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchPosts = useCallback(async () => {
        try {
            const fetched = await request('/api/posts', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPosts(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="post">
            {!loading && <PostCard posts={posts}/>}
        </div>
    );
}

export default Home;