import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Spinner} from "../../components/Loader";
import {FormErrors} from "../../components/FormError";
import {Button, Form} from "react-bootstrap";

function CreateService() {
    const {loading, request, error} = useHttp();
    const {token} = useContext(AuthContext)
    const [form, setForm] = useState({
        name: '', description: '', files: []
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
            setForm({ ...form, files: values });
        });
    }

    const creationHandler = async () => {
        try {
            const data = await request('/api/services/create', 'POST', {...form},
                {
                    Authorization: `Bearer ${token}`
                }
            )
            console.log('Data ', data)
        } catch (e) {}
    }

    if (loading) {
        return <Spinner/>
    }
    return (
        <div className="form">
            <FormErrors formErrors={error} />
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        placeholder="Введите название"
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Введите описание"
                        value={form.description}
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.File
                    id="custom-file-translate-scss"
                    data-browse="Выбрать файл"
                    label="Загрузите фото"
                    lang="ru"
                    custom
                    name="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                />


                <Button
                    variant="secondary"
                    className='mr-m'
                    type="submit"
                    onClick={creationHandler}
                    disabled={loading}
                >
                    Создать
                </Button>
            </Form>
        </div>
    )

}

export default CreateService