import React, {useContext, useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {FormErrors} from "../../components/FormError";




function AddPost() {
    const {token} = useContext(AuthContext)
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({
        title: '', text: '', file: ''
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const createHandler = async () => {
        try {
            const data = await request ('/api/posts/create', 'POST', {...form}, {
                Authorization: `Bearer ${token}`
            })
            console.log(data);
        } catch (e) {}
    }
    return (
        <div className="form">
            <FormErrors formErrors={error}/>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>Расскажите нам свою историю</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="7"
                        name="text"
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.File
                    id="custom-file-translate-scss"
                    data-browse="Выбрать файл"
                    label="Загрузите свои файлы"
                    lang="ru"
                    custom
                    name="file"
                    onChange={changeHandler}
                />

                <Button
                    style={{marginTop: 10}}
                    variant="secondary"
                    className='mr-m'
                    type="submit"
                    onClick={createHandler}
                    disabled={loading}
                >
                    Создать пост
                </Button>
            </Form>
        </div>
    )
}

export default AddPost