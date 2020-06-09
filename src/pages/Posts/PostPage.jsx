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

                    {!!post.files.length && <Row style={{ padding: '10px 0' }}>
                        {post.files.map((file, i) => (
                            <Col key={i} md={6}>
                                <Image src={file} fluid />
                            </Col>
                        ))}
                    </Row>}
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