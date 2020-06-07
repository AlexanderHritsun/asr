import React, {useCallback, useContext, useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {FormErrors} from "../../components/FormError";
import {AuthContext} from "../../context/AuthContext";
import { useParams } from "react-router-dom"
import {Spinner} from "../../components/Loader";




function EditUser() {
    const id = useParams().id
    const {token} = useContext(AuthContext)
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({
        email: '', name: '', role: ''
    })

    const getUserData = useCallback( async () => {
      const data = await request(`/api/users/${id}/edit`, 'GET', null, {
          Authorization: `Bearer ${token}`
      })
        setForm(data)
    }, [request, token]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const updateHandler = async (id) => {
        try {
             await request(`/api/users/${id}/edit`, 'PUT', {...form}, {
                Authorization: `Bearer ${token}`
            })
            getUserData()
        } catch (e) {}
    }

    useEffect(() => {
        getUserData()
    }, [getUserData])

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className="form">
            <FormErrors formErrors={error} />
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        placeholder="Введите email"
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="login">
                    <Form.Label>Никнейм</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Введите никнейм"
                        value={form.name}
                        onChange={changeHandler}
                    />

                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Роль</Form.Label>
                    <Form.Control
                        as="select"
                        id="role"
                        name="role"
                        placeholder="Укажите роль"
                        value={form.role}
                        onChange={changeHandler}
                    >
                        <option>user</option>
                        <option>admin</option>
                        <option>moderator</option>
                    </Form.Control>
                </Form.Group>


                <Button
                    variant="secondary"
                    className='mr-m'
                    type="submit"
                    onClick={() => updateHandler(form._id)}
                    disabled={loading}
                >
                    Сохранить
                </Button>

                <Button
                    variant="primary"
                    href="/users"
                >
                    Отменить
                </Button>
            </Form>
        </div>
    )
}

export default EditUser