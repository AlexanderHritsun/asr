import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {FormErrors} from "../../components/FormError";
import {Spinner} from "../../components/Loader";




function Register() {
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({
        email: '', name: '', password: '', repeat_password: '', role: 'user'
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registerHandler = async () => {
        try {
            const data = await request ('/api/auth/registration', 'POST', {...form})
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

                <Form.Group controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        placeholder="Введите пароль"
                        onChange={changeHandler}
                    />
                </Form.Group>

                <Form.Group controlId="repeat_password">
                    <Form.Label>Пароль ещё раз</Form.Label>
                    <Form.Control
                        required
                        size="lg"
                        id="repeat_password"
                        name="repeat_password"
                        type="password"
                        value={form.repeat_password}
                        placeholder="Введите пароль повторно"
                      onChange={changeHandler}/>
                </Form.Group>

                <Button
                    variant="secondary"
                    className='mr-m'
                    type="submit"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Зарегистрироваться
                </Button>
            </Form>
        </div>
    )
}

export default Register