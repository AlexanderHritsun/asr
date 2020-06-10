import React, {useEffect, useState} from 'react';



export const FormErrors = ({formErrors}) => {
    // const [formErrors, setError] = useState();
    //
    // useEffect(() => {
    //     if (formErrors) {
    //         setTimeout(()=> {
    //             setError(null)
    //         }, 5000)
    //     }
    // }, [formErrors])


    if(formErrors){
        return (
            <div>
                <p className="alert">{formErrors}</p>
            </div>
        )
    } else {
        return ''
    }
}
