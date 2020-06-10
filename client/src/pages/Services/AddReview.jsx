import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHttp } from "hooks/http.hook";
import { AuthContext } from "context/AuthContext";
import { FormErrors } from "components/FormError";
import BeautyStars from "beauty-stars";

const AddReview = ({ onActionPerformed, serviceId }) => {
    const { token } = useContext(AuthContext)
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({
        text: '', rating: 0,
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const createHandler = async () => {
        try {
            const data = await request('/api/review/create', 'POST', { ...form, serviceId }, {
                Authorization: `Bearer ${token}`
            });
            if (onActionPerformed) onActionPerformed(data);
            setForm({ text: '', rating: 0 })
        } catch (e) { }
    }
    return (
        <div className="form">
            <FormErrors formErrors={error} />
            <Form>

                <Form.Group controlId="text">
                    <Form.Label>Оставить отзыв</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="4"
                        name="text"
                        value={form.text}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>Рейтинг</Form.Label>
                    <Form.Control
                        type="range"
                        min="0"
                        max="5"
                        name="rating"
                        value={form.rating}
                        onChange={changeHandler}
                    />
                </Form.Group>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 15
                    }}
                >
                    <BeautyStars
                        size={15}
                        value={form.rating}
                    />
                </div>

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

export default AddReview