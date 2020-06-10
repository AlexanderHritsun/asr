import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import { PostComment } from "components/Comment";
import AddComment from "./AddComment";


function PostSpecificPage() {
    const id = useParams().id
    const { token } = useContext(AuthContext)
    const { request } = useHttp();
    const [post, setForm] = useState({
        title: '', text: '', files: [], comments: []
    })

    const getPostData = useCallback(async () => {
        try {
            const data = await request(`/api/posts/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setForm(data)
        } catch (e) { }
    }, [token, request]);

    const handleCommentActionPerformed = () => {
        getPostData()
    }

    useEffect(() => {
        getPostData()
    }, [getPostData])

    return (
        <Container>
            <Card className='w100'>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>

                    <Card.Text>
                        {post.text}
                    </Card.Text>

                    {!!post.files.length &&
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 15
                            }}>
                            {post.files.map((file, i) => (
                                <Image src={file} rounded style={{
                                    maxWidth: 400,
                                    maxHeight: 400,
                                    margin: 10,
                                    objectFit: 'cover'
                                }} />
                            ))}
                        </div>}
                </Card.Body>
            </Card>
            <div style={{ padding: 10 }}>
                Комментарии:
            </div>
            {!post.comments.length &&
                <div>
                    <p>Комментариев пока нет</p>
                </div>
            }
            {post.comments.map(comment => {
                return(
                        <PostComment key={comment._id} comment={comment} onActionPerformed={handleCommentActionPerformed} />
                    )
            })}
            {!!token && <AddComment postId={post._id} onActionPerformed={handleCommentActionPerformed} />}
        </Container>
    )
}

export default PostSpecificPage