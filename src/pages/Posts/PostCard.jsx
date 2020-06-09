import {Button, Card, Row, Image, Col, Container} from "react-bootstrap";
import React from "react";
import {NavLink} from "react-router-dom";


export const PostCard = ({posts}) => {

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

                            {!!post.files.length && <Row style={{ padding: '10px 0' }}>
                                {post.files.map((file, i) => (
                                    <Col key={i} md={6}>
                                        <Image src={file} fluid />
                                    </Col>
                                ))}
                            </Row>}

                            <NavLink to={`/posts/${post._id}`}>
                                <Button variant="primary">Читать дальше</Button>
                            </NavLink>
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
    )
}
