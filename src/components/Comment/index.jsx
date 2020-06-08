import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";



export const PostComment = ({comments}) => {
    if(!comments) {
        return (
            <div>
                <p>Комментариев пока нет</p>
            </div>
        )
    }

    if(comments){
        return (
                <Card className='w100'>
                    <Card.Body>
                        <Card.Text>
                            {comments.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
        )
    } else {
        return ''
    }
}
