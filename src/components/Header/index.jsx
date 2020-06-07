import React, {useContext} from "react";
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { NavLink, useHistory} from "react-router-dom";
import { GoSearch} from "react-icons/all";
import {AuthContext} from "../../context/AuthContext";




function Header(isAuthenticated) {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
         //history.push('/')
    }

    if(isAuthenticated) {
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="asr-nav">
                    <Navbar.Brand href="/">ASR</Navbar.Brand>
                    <div className="ml-auto">
                        <NavLink to='/posts/create'>
                            <Button variant="light" className='mr-m'>Новый пост</Button>
                        </NavLink>
                        <NavLink to='/'>
                            <Button
                                variant="secondary"
                                className='mr-m'
                                onClick={logoutHandler}
                            >
                                Выйти
                            </Button>
                        </NavLink>
                    </div>
                </Navbar>

                <Form inline>
                    <div className='search-icon'>
                        <GoSearch/>
                    </div>
                    <div className='search-wrapper'>
                        <FormControl type="text" placeholder="Поиск" className='w100 asr-input' />
                    </div>
                </Form>
            </div>
        )
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="asr-nav">
                <Navbar.Brand href="/">ASR</Navbar.Brand>
                <div className="ml-auto">
                    <NavLink to='/login'>
                        <Button variant="light" className='mr-m'>Войти</Button>
                    </NavLink>
                    <NavLink to='/registration'>
                        <Button variant="secondary" className='mr-m'>Регистрация</Button>
                    </NavLink>
                </div>
            </Navbar>

            <Form inline>
                <div className='search-icon'>
                    <GoSearch/>
                </div>
                <div className='search-wrapper'>
                    <FormControl type="text" placeholder="Поиск" className='w100 asr-input' />
                </div>
            </Form>
         </div>
    )
}

export default Header;