import React, { useEffect, useState, useContext, useCallback } from "react";
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import BeautyStars from "beauty-stars";
import { useParams } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import { Review } from "components/Review";
import AddReview from "./AddReview";

function ServiceSpecificPage() {
    const id = useParams().id
    const { token } = useContext(AuthContext)
    const { request } = useHttp();
    const [service, setService] = useState({
        name: '', description: '', rating: 0, files: [], reviews: []
    })

    const getServiceData = useCallback(async () => {
        try {
            const data = await request(`/api/services/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setService(data)
        } catch (e) { }
    }, [token, request]);

    const handleReviewActionPerformed = () => {
        getServiceData()
    }

    useEffect(() => {
        getServiceData()
    }, [getServiceData])

    return (
        <Container>
            <Card className='w100'>
                <Card.Body>
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

                    <Card.Text>
                        {service.description}
                    </Card.Text>

                    {!!service.files.length &&
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 15
                            }}>
                            {service.files.map((file, i) => (
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
                Отзывы:
            </div>
            {!service.reviews.length &&
                <div>
                    <p>Отзывов пока нет</p>
                </div>
            }
            {service.reviews.map(review => {
                return (
                    <Review key={review._id} review={review} onActionPerformed={handleReviewActionPerformed} />
                )
            })}
            {!!token && <AddReview serviceId={service._id} onActionPerformed={handleReviewActionPerformed} />}
        </Container>
    )
}

export default ServiceSpecificPage;