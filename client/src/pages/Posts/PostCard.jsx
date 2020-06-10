import {Button, Card, Container} from "react-bootstrap";
import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";


export const PostCard = ({ posts, onActionPerformed }) => {
    const {request} = useHttp()
    const { token, userRole } = useContext(AuthContext)
    const isModer = userRole === 'moderator';
    const isAdmin = userRole === 'admin';

    const handleDeletePost = async (post) => {
        try {
            const data = await request(`/api/posts/${post._id}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (onActionPerformed) onActionPerformed(data);
        } catch (e) { }
    }

    if(!posts.length){
        return <p className="align-self-center">Постов пока нет</p>
    }

    return (
        <Container>
            {posts.map( (post, i) => {
                return (
                    <Card key={i} className='w100'>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>

                            <Card.Text className="post-text">
                                {post.text}
                            </Card.Text>

                            <NavLink to={`/posts/${post._id}`}>
                                <Button variant="primary">Читать дальше</Button>
                            </NavLink>
                        </Card.Body>

                        {(isAdmin || isModer) && <Button className="delete-btn" variant="secondary" onClick={() => handleDeletePost(post)}>Удалить</Button>}
                    </Card>
                )
            })}
        </Container>
    )
}
