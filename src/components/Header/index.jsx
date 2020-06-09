import React, { useContext, useCallback } from "react";
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { GoSearch } from "react-icons/all";
import { AuthContext } from "context/AuthContext";

const Header = ({isAuthenticated}) => {

    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
    };

    if (isAuthenticated) {
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="asr-nav">
                    <Navbar.Brand href="/posts">ASR</Navbar.Brand>
                    <div className="ml-auto">
                        <NavLink to='/services/create'>
                            <Button variant="light" className='mr-m'>Создать сервис</Button>
                        </NavLink>
                        <NavLink to='/posts/create'>
                            <Button variant="light" className='mr-m'>Новый пост</Button>
                        </NavLink>
                        <Button
                            variant="secondary"
                            className='mr-m'
                            onClick={logoutHandler}
                        >
                            Выйти
                        </Button>
                    </div>
                </Navbar>

                <Form inline>
                    <div className='search-icon'>
                        <GoSearch />
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
                <Navbar.Brand href="/posts">ASR</Navbar.Brand>
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
                    <GoSearch />
                </div>
                <div className='search-wrapper'>
                    <FormControl type="text" placeholder="Поиск" className='w100 asr-input' />
                </div>
            </Form>
        </div>
    )
}

export default Header;