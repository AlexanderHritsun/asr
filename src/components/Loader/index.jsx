import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export const Spinner = () => {
    return (
        <div className="loader">
            <Loader
                type="Oval"
                color="dimgrey"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    )

}
