import React, {useCallback, useContext, useEffect, useState} from "react";
import { Card, Button } from 'react-bootstrap';
import BeautyStars from "beauty-stars";
import { NavLink, useLocation } from "react-router-dom";
import {ServiceCard} from "./ServiceCard";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Spinner} from "../../components/Loader";

function Services() {
    const { search } = useLocation();
    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchServices = useCallback(async () => {
        try {
            const fetched = await request(`/api/services${search}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setServices(fetched)
        } catch (e) {}
    }, [token, request, search])

    useEffect(() => {
        fetchServices()
    }, [fetchServices])

    const handleServiceActionPerformed = () => {
        fetchServices()
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <ServiceCard services={services} onActionPerformed={handleServiceActionPerformed}/>
    );
}

export default Services;