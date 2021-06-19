import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../core/contexts/app-context/appContext';
import { UserProfile } from '../../models';

export default function Contact() {
    const { appState } = useContext(AppContext);
    const { user } = appState;
    

    // useEffect( () => {
    //     console.log(user)
    // },
    // [user])
    
    return (
        <div>
            {renderContactPage(user)}
        </div>
    )
}


function renderContactPage(user: UserProfile) {
    return <>
        <div>Contact Page</div>

    </>
}