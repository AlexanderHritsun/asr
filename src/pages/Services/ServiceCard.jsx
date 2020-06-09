import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React from "react";
import BeautyStars from "beauty-stars";

export const ServiceCard = ({services}) => {

    if(!services.length){
        return <p className="align-self-center">Постов пока нет</p>
    }

    return (
        <Container className="service-card">
            <Row style={{ flexWrap: 'wrap' }}>
                {services.map( (service, i) => {
                    return (
                        <Col key={i} md={3}>
                            <Card>
                                <Card.Img variant="top" src={service.files[0] || "https://cdn2.vectorstock.com/i/1000x1000/37/86/auto-mechanic-service-flat-icons-of-maintenance-vector-2953786.jpg"} />
                                <Card.Body>
                                    <div>
                                        <Card.Title>{service.name}</Card.Title>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginBottom: 15
                                            }}
                                        >
                                            <BeautyStars
                                                size={15}
                                                value={service.rating}
                                            />
                                        </div>
                                    </div>
                                    <NavLink to={`/services/${service._id}`}>
                                        <Button variant="primary">Просмотреть</Button>
                                    </NavLink>
                                    <Card.Text>
                                        {service.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
