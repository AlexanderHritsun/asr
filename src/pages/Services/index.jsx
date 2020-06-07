import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import BeautyStars from "beauty-stars";
import { NavLink } from "react-router-dom";

function Services() {
    useEffect(() => {
        // get from server request to your own server via axios
    });

    const [rating, setRating] = useState(0);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '45px'
            }}
        >
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn2.vectorstock.com/i/1000x1000/37/86/auto-mechanic-service-flat-icons-of-maintenance-vector-2953786.jpg" />
                <Card.Body>
                    <div>
                        <Card.Title>Суми АВТО</Card.Title>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 15
                            }}
                        >
                            <BeautyStars
                                size={15}
                                value={rating}
                                onChange={value => setRating(value)}
                            />
                        </div>
                    </div>
                    <Card.Text>
                        Быстро, недорого, без очереди
                    </Card.Text>
                    <NavLink to='/services/1'>
                        <Button variant="primary">Просмотреть</Button>
                    </NavLink>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn2.vectorstock.com/i/1000x1000/37/86/auto-mechanic-service-flat-icons-of-maintenance-vector-2953786.jpg" />
                <Card.Body>
                    <div>
                        <Card.Title>Auto life</Card.Title>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 15
                            }}
                        >
                            <BeautyStars
                                size={15}
                                value={rating}
                                onChange={value => setRating(value)}
                            />
                        </div>
                    </div>
                    <Card.Text>
                        Специализируется на обслуживании: Toyota
                        Стоимость нормочаса от: 170 грн.
                    </Card.Text>
                    <Button variant="primary">Просмотреть</Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn2.vectorstock.com/i/1000x1000/37/86/auto-mechanic-service-flat-icons-of-maintenance-vector-2953786.jpg" />
                <Card.Body>
                    <div>
                        <Card.Title>DN Service</Card.Title>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 15
                            }}
                        >
                            <BeautyStars
                                size={15}
                                value={rating}
                                onChange={value => setRating(value)}
                            />
                        </div>
                    </div>
                    <Card.Text>
                        Автосервис DN Service в г.Сумы
                    </Card.Text>
                    <Button variant="primary">Просмотреть</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Services;