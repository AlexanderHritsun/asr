import React, {useState, useContext} from "react";
import {Form, Button} from "react-bootstrap";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from '../../context/AuthContext'
import {FormErrors} from "../../components/FormError";
import {Spinner} from "../../components/Loader";



function Login() {
    const auth = useContext(AuthContext)
    const {loading, request, error} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
             auth.login(data.token, data.userId)
        } catch (e) {}
    }
    if(loading){
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
               <Button
                   variant="secondary"
                   className='mr-m'
                   type="submit"
                   onClick={loginHandler}
                   disabled={loading}
               >
                   Войти
               </Button>
           </Form>
       </div>
   )
}

export default Login