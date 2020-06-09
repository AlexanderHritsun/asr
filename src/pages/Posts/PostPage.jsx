import { Card, Container, Row, Col, Image } from "react-bootstrap";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { PostComment } from "../../components/Comment";


function PostSpecificPage() {
    const id = useParams().id
    const { token } = useContext(AuthContext)
    const { request } = useHttp();
    const [post, setForm] = useState({
        title: '', text: '', files: []
    })
    const [comments, setComments] = useState()

    const getPostData = useCallback(async () => {
        try {
            const data = await request(`/api/posts/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setForm(data)
        } catch (e) { }
    }, [token, request]);


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
            {/*{comments.map(comment => {
                return(
                        <PostComment comments={comment}/>
                    )
            })}*/}
        </Container>
    )
}

export default PostSpecificPage