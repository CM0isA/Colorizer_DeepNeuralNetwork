import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { UsersApiService } from '../../../services';
import * as yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { Button, CircularProgress, Grid, TextField, Typography, makeStyles } from '@material-ui/core';
import { User } from '../../models';

const useStyles = makeStyles({
    root: {
        maxWidth: '450px',
        textAlign: 'center',
        margin: '100px auto',
        backgroundColor: 'white',
        border: '1px solid black'
    },
    submitButton: {
        textAlign: 'center',
        padding: '15px auto',
        marginTop: '10px',
        marginBottom: '10px'

    },
    title: {
        padding: '15px 0'
    }
});

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .required('First Name is required')
        .max(16, 'The name is too long')
        .min(2, 'Last Name should be at least 2 characters'),

    lastName: yup.string()
        .required('Last Name is required')
        .max(16, 'The name is too long')
        .min(2, 'Last Name should be at least 2 characters'),
});

interface ConfirmAccountProps {
    firstName: string,
    lastName: string,
    avatar: string
}

const initialValues = {
    firstName: '',
    lastName: '',
    avatar: '',
}

const emptyUser: User = {
    id: '',
    email: '',
    role: 'user',
    firstName: '',
    lastName: '',
    hashedPassword: '',
    accountStatus: 'created',
    accountCode: '',
    avatar: '',
}


export default function ConfirmAccountPage() {
    const classes = useStyles();
    const history = useHistory();
    const userService = new UsersApiService();

    const code = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const [user, setUser] = useState<User>(emptyUser);

    useEffect(() => {
        const fetchData = async () => {
            const response = await userService.getUser(code);
            setUser(response);
        };

        fetchData();
    }, [code]);


    const onSubmit = async (values: ConfirmAccountProps, actions) => {
        user.firstName = values.firstName;
        user.lastName = values.lastName;
        await userService.confirmAccount(user);
        
        actions.setSubmitting(false);
        history.replace('/');
    }

    const renderConfirmAccount = () => {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(props: FormikProps<ConfirmAccountProps>) => {
                    const {
                        values, touched, errors, isSubmitting, handleChange, handleBlur,
                    } = props;

                    return (
                        <Form className={classes.root}>
                            {renderElements(values, errors, touched, isSubmitting, handleChange, handleBlur)}
                        </Form>);
                }}
            </Formik>
        );
    }

    const renderElements = (values, errors, touched, isSubmitting, handleChange, handleBlur) => {
        return (
            <>
                <Typography className={classes.title}>Confirm Account</Typography>
                <Grid container justify='center' direction='row'>
                <Grid item xs={10}>
                    <Typography>{`${user.email}`}</Typography>
                </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            required
                            autoComplete='false'
                            name="firstName"
                            id="firstName"
                            label="First Name"
                            value={values.firstName}
                            type="firstName"
                            helperText={
                                errors.firstName && touched.firstName
                                    ? errors.firstName
                                    : ''
                            }
                            onBlur={handleBlur}
                            error={errors.firstName && touched.firstName ? true : false}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            required
                            autoComplete='false'
                            name="lastName"
                            id="lastName"
                            label="Last Name"
                            value={values.lastName}
                            type="lastName"
                            helperText={
                                errors.lastName && touched.lastName
                                    ? errors.lastName
                                    : ''
                            }
                            onBlur={handleBlur}
                            error={errors.lastName && touched.lastName ? true : false}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={10} >
                        {isSubmitting ?
                            <CircularProgress /> :
                            <Button 
                                className={classes.submitButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Confirm Account
                            </Button>}
                    </Grid>
                </Grid>
            </>
        )
    }
    return (
        <>
            {renderConfirmAccount()}
        </>
    )
}
