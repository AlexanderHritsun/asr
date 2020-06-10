import React, { useContext } from 'react';
import { Card, Button } from "react-bootstrap";
import { AuthContext } from "context/AuthContext";
import { useHttp } from "hooks/http.hook";



export const PostComment = ({ comment, onActionPerformed }) => {
    const { request } = useHttp();
    const { token, userRole } = useContext(AuthContext)
    const isModer = userRole === 'moderator';
    const isAdmin = userRole === 'admin';

    const handleDeleteComment = async () => {
        try {
            const data = await request(`/api/comments/${comment._id}/delete`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (onActionPerformed) onActionPerformed(data);
        } catch (e) { }
    }

    if (comment) {
        return (
            <Card className='w100 comment'>
                <Card.Body>
                    <Card.Title>
                        {comment.userId ? comment.userId.name : ''}
                    </Card.Title>
                    <Card.Text>
                        {comment.text}
                    </Card.Text>
                    {(isAdmin || isModer) && <Button variant="secondary" className="delete-btn" onClick={() => handleDeleteComment()}>Удалить</Button>}
                </Card.Body>
            </Card>
        )
    }
}
