import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Spinner} from "../../components/Loader";
import {FormErrors} from "../../components/FormError";
import {Button, Form, Image} from "react-bootstrap";

function CreateService() {
    const {loading, request, error} = useHttp();
    const history = useHistory();
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
            setForm({ ...form, files: [...form.files, ...values] });
        });
    }
    const removeFileHandler = (idx) => {
        const copy = [...form.files];
        copy.splice(idx, 1);
        setForm({ ...form, files: copy });
    }

    const creationHandler = async () => {
        try {
            const data = await request('/api/services/create', 'POST', {...form},
                {
                    Authorization: `Bearer ${token}`
                }
            )
            history.push('/services');
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
                    multiple
                    id="custom-file-translate-scss"
                    data-browse="Выбрать файл"
                    label="Загрузите фото"
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
                            <div style={{ position: 'relative' }}>
                                <Image src={file} rounded style={{
                                    maxWidth: 100,
                                    maxHeight: 100,
                                    margin: 10,
                                    objectFit: 'cover'
                                }} />
                                <div style={{ 
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    width: 20,
                                    height: 20,
                                    background: 'rgba(0,0,0,0.5)',
                                    borderRadius: 5,
                                    fontSize: 12,
                                    color: '#fff',
                                    textAlign: 'center'
                                }}
                                onClick={() => removeFileHandler(i)}>X</div>
                            </div>
                        ))}
                    </div>}


                <Button
                    variant="secondary"
                    className='mr-m'
                    type="button"
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