import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import BeautyStars from "beauty-stars";
import { NavLink } from "react-router-dom";

function ServiceSpecificPage() {
    useEffect(() => {
        // get from server request to your own server via axios
    });

    const [rating, setRating] = useState(0);

    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut dolore dolorem eaque perferendis quas ullam? Ab, alias dolores eveniet expedita explicabo inventore modi neque, optio provident sint totam unde?
        </div>
    );
}

export default ServiceSpecificPage;