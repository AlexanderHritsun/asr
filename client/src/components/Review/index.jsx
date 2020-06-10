import React, { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";
import BeautyStars from "beauty-stars";

export const Review = ({ review, onActionPerformed }) => {
    const { request } = useHttp();
    const { token, userRole } = useContext(AuthContext)
    const isModer = userRole === 'moderator';
    const isAdmin = userRole === 'admin';

    const handleDeleteReview = async () => {
        try {
            const data = await request(`/api/review/${review._id}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (onActionPerformed) onActionPerformed(data);
        } catch (e) { }
    }

    if (review) {
        return (
            <Card className='w100 comment'>
                <Card.Body>
                    <Card.Title>
                        {review.userId ? review.userId.name : ''}
                    </Card.Title>
                    <Card.Text>
                        {review.text}
                    </Card.Text>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <BeautyStars
                            size={15}
                            value={review.rating}
                        />
                    </div>
                    {(isAdmin || isModer) && <Button variant="secondary" className="delete-btn" onClick={() => handleDeleteReview()}>Удалить</Button>}
                </Card.Body>
            </Card>
        )
    }
}
