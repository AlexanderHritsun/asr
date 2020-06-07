import React, {useCallback, useContext} from "react";
import {Card, Container, Button, Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../Loader";


export const UserCard = ({users, deleteUser}) => {

    if(!users.length){
        return <p className="align-self-center">Юзеров пока нет</p>
    }
    console.log('Users object', {users})
    return (
        <Container>
            <Row >
                {users.map(user => {
                    return (

                            <Col md={3}>
                                <Card style={{marginBottom: 25}}>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                                        <Card.Text>{user.role}</Card.Text>
                                        <NavLink to={`/users/${user._id}/edit`}>
                                            <Button className="mr-m" variant="primary">Edit</Button>
                                        </NavLink>
                                            <Button
                                                className="mr-m"
                                                variant="outline-secondary"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                    )
                })}
            </Row>
        </Container>
    )
}