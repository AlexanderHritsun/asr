import React from 'react';
import {Card} from "react-bootstrap";



export const PostComment = ({comments}) => {
    if(comments){
        return (
                <Card className='w100'>
                    <Card.Body>
                        <Card.Title>
                            {comments.user.name}
                        </Card.Title>
                        <Card.Text>
                            {comments.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
        )
    }
}
