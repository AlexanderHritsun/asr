import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import React, { useContext } from "react";
import BeautyStars from "beauty-stars";

export const ServiceCard = ({ services, onActionPerformed }) => {
    const { request } = useHttp()
    const { token, userRole } = useContext(AuthContext)
    const isModer = userRole === 'moderator';
    const isAdmin = userRole === 'admin';

    const handleDeleteService = async (service) => {
        try {
            const data = await request(`/api/services/${service._id}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (onActionPerformed) onActionPerformed(data);
        } catch (e) { }
    }

    if (!services.length) {
        return <p className="align-self-center">Постов пока нет</p>
    }

    return (
        <Container className="service-card">
            <Row style={{ flexWrap: 'wrap' }}>
                {services.map((service, i) => {
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

                                {(isAdmin || isModer) && <Button className="delete-btn" variant="secondary" onClick={() => handleDeleteService(service)}>Удалить</Button>}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
