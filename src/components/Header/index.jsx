import React, { useState, useContext, useEffect, useRef } from "react";
import qs from 'qs';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { GoSearch } from "react-icons/all";
import { AuthContext } from "context/AuthContext";

const Header = ({ isAuthenticated }) => {
    const { pathname, search } = useLocation();
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const searctTimeout = useRef(null);

    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
    };
    const handleSearch = (e) => {
        if (searctTimeout.current) clearTimeout(searctTimeout.current);
        const val = e.target.value;
        setSearchText(val);
        searctTimeout.current = setTimeout(() => {
            history.push(`${pathname}?search=${val}`)
        }, 1000);
    };

    useEffect(() => {
        const query = qs.parse(search, { ignoreQueryPrefix: true });
        if (query.search) setSearchText(query.search);
    }, [search]);

    return (
        <div>
            {isAuthenticated ? 
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
                :
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
                </Navbar>}

            <Form inline>
                <div className='search-icon'>
                    <GoSearch />
                </div>
                <div className='search-wrapper'>
                    <FormControl
                        type="text"
                        placeholder="Поиск"
                        className='w100 asr-input'
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
            </Form>
        </div>
    )
}

export default Header;