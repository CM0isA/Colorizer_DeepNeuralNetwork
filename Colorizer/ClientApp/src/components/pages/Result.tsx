import { Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router';

export default function Result() {
    const history = useHistory();

    const imageSource = localStorage.getItem('imageSource');
    return (
        <div>
            <img src={process.env.PUBLIC_URL + '/PNG/' + imageSource} />
            <br></br>
            <Button variant='outlined' onClick={() => history.replace("/")}>Back to main </Button>
        </div>
    )
}
