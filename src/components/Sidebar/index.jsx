import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";
import {NavLink} from "react-router-dom";
import React from "react";

function Menu({isAuthenticated, isAdmin}) {
    if(isAuthenticated && isAdmin) {
        return (
            <SideNav
                className='asr-sidebar'
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="posts">
                        <NavIcon>
                            <NavLink to="/posts">
                                <i className="fa fa-fw fa-newspaper-o" style={{ fontSize: '1.75em' }} />
                            </NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/posts">ПОСТЫ</NavLink>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="services">
                        <NavIcon>
                            <NavLink to="/services"><i className="fa fa-fw fa-cogs" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/services">РЕЙТИНГ СЕРВИСОВ</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="support">
                        <NavIcon>
                            <NavLink to="/support"><i className="fa fa-fw fa-envelope" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/support">ПОДДЕРЖКА</NavLink>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="users">
                        <NavIcon>
                            <NavLink to="/users"><i className="fa fa-fw fa-users" style={{ fontSize: '1.75em' }} /></NavLink>
                        </NavIcon>
                        <NavText>
                            <NavLink to="/users">Users</NavLink>
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        )
    }
    return (
                <SideNav
                    className='asr-sidebar'
                    onSelect={(selected) => {
                        // Add your code here
                    }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="posts">
                            <NavIcon>
                                <NavLink to="/posts">
                                    <i className="fa fa-fw fa-newspaper-o" style={{ fontSize: '1.75em' }} />
                                </NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="/posts">ПОСТЫ</NavLink>
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="services">
                            <NavIcon>
                                <NavLink to="/services"><i className="fa fa-fw fa-cogs" style={{ fontSize: '1.75em' }} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="/services">РЕЙТИНГ СЕРВИСОВ</NavLink>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="support">
                            <NavIcon>
                                <NavLink to="/support"><i className="fa fa-fw fa-envelope" style={{ fontSize: '1.75em' }} /></NavLink>
                            </NavIcon>
                            <NavText>
                                <NavLink to="/support">ПОДДЕРЖКА</NavLink>
                            </NavText>
                        </NavItem>

                    </SideNav.Nav>
                </SideNav>
    )
}

export default Menu