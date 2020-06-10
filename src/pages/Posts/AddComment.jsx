import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { FormErrors } from "components/FormError";

const AddComment = ({ onActionPerformed, postId }) => {
    const { token } = useContext(AuthContext)
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({
        text: ''
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const createHandler = async () => {
        try {
            const data = await request('/api/comments/create', 'POST', { ...form, postId }, {
                Authorization: `Bearer ${token}`
            });
            if (onActionPerformed) onActionPerformed(data);
            setForm({ text: '' })
        } catch (e) { }
    }
    return (
        <div className="form">
            <FormErrors formErrors={error}/>
            <Form>

                <Form.Group controlId="text">
                    <Form.Label>Оставить комментарий</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="4"
                        name="text"
                        value={form.text}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Button
                    style={{ marginTop: 10 }}
                    variant="secondary"
                    className='mr-m'
                    type="button"
                    onClick={createHandler}
                    disabled={loading}
                >
                    Создать
                </Button>
            </Form>
        </div>
    )
}

export default AddComment