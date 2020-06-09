import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { FormErrors } from "../../components/FormError";




function AddPost() {
    const { token } = useContext(AuthContext)
    const { loading, request, error } = useHttp();
    const [form, setForm] = useState({
        title: '', text: '', files: []
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const fileChangeHandler = async (event) => {
        const files = [...event.target.files];
        Promise.all(files.map(file => toBase64(file))).then((values) => {
            setForm({ ...form, files: [...form.files, ...values] });
        });
    }
    const createHandler = async () => {
        try {
            const data = await request('/api/posts/create', 'POST', { ...form }, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) { }
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
                        value={form.title}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>Расскажите нам свою историю</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="7"
                        name="text"
                        value={form.text}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.File
                    multiple
                    id="custom-file-translate-scss"
                    data-browse="Выбрать файл"
                    label="Загрузите свои файлы"
                    lang="ru"
                    custom
                    name="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                />

                {!!form.files.length &&
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 15
                        }}>
                        {form.files.map((file, i) => (
                            <Image src={file} rounded style={{
                                maxWidth: 100,
                                maxHeight: 100,
                                margin: 10,
                                objectFit: 'cover'
                            }} />
                        ))}
                    </div>}

                <Button
                    style={{ marginTop: 10 }}
                    variant="secondary"
                    className='mr-m'
                    type="button"
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