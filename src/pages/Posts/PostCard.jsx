import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {NavLink} from "react-router-dom";


export const PostCard = ({posts}) => {

    if(!posts.length){
        return <p className="align-self-center">Постов пока нет</p>
    }

    return (
        <Container>
            {posts.map( post => {
                return (
                    <Card className='w100'>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>

                            <Card.Text className="post-text">
                                {post.text}
                            </Card.Text>

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
