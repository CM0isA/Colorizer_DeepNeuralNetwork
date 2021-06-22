import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../core/contexts/app-context/appContext';
import { User } from '../../models';

export default function Contact() {
    const { appState } = useContext(AppContext);
    const { user } = appState;
    

    console.log(user)
    
    return (
        <div>
            User
            {renderContactPage(user)}
        </div>
    )
}


function renderContactPage(user: User) {
    return <>
        <div>SA</div>

    </>
}