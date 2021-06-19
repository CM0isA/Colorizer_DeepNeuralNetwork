import { Button, CircularProgress, Grid, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { UsersApiService } from '../../../services';


interface AccountProps {
    email: string;
    password: string;
    confirmPassword: string;
}

interface Account {
    email: string;
    password: string;
}

const initialValues =
{
    email: '',
    password: '',
    confirmPassword: '',
}


const validationSchema = yup.object().shape({
    email: yup.string()
        .required('Email is required')
        .email('Must be a valid email address')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Must be a valid email address'),
    password: yup.string()
        .required('Password is required')
        .max(30, 'Password is too long')
        .min(6, 'Password should be at least 6 characters long')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{2,26}\S$/
        , 'One uppercase, one lowercase, one special character and no spaces'),
    confirmPassword: yup.string()
                    .required('Confirm Password is required')
                    .oneOf([yup.ref('password'), null]
                    , 'Passwords do not match')
});


const CreateAccount: React.FC = () => {
    const history = useHistory();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar]  = useState<boolean>(false);

    const userService = new UsersApiService();
    const onSubmit = async (values: AccountProps, actions) => {
        const account: Account = {
            email: values.email,
            password: values.password,
        }


        const response = await userService.createAccount(account);
        console.log(response)
        actions.setSubmitting(false);
        

        if(response.status !==200)
        {
            setErrorSnackbar(true);
        }
        else
        {
            history.replace('/');
            setOpenSnackbar(true);
        }        
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const renderCreateAccount = () => {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(props: FormikProps<AccountProps>) => {
                    const {
                        values, touched, errors, isSubmitting, handleChange, handleBlur,
                    } = props;

                    return (
                        <Form>
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <Alert onClose={handleClose} severity='info'>
                                    A confirmation mail have been send to the specified address.
                                </Alert>
                            </Snackbar>
                            <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <Alert onClose={handleClose} severity='error'>
                                    An error occured during the account creation. Please check your mail for confirmation messages and try again.
                                </Alert>
                            </Snackbar>
                            {renderElements(values, errors, touched, isSubmitting, handleChange, handleBlur)}
                        </Form>);
                }}
            </Formik>
        );
    }

    const renderElements = (values, errors, touched, isSubmitting, handleChange, handleBlur) => {
        return (
            <>
                <Grid container justify='space-around' direction='row'>
                    <Grid item xs={10}>
                        <TextField
                            required
                            autoComplete='false'
                            name="email"
                            id="email"
                            label="Email"
                            value={values.email}
                            type="email"
                            helperText={
                                errors.email && touched
                                    ? errors.email
                                    : ''
                            }
                            onBlur={handleBlur}
                            error={!!(errors.email)}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            autoComplete='false'
                            required
                            name="password"
                            id="password"
                            label="Password"
                            value={values.password}
                            type="password"
                            helperText={
                                errors.password && touched.password
                                    ? errors.password
                                    : null
                            }
                            onBlur={handleBlur}
                            error={!!(errors.password)}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            required
                            name="confirmPassword"
                            id="confirmPassword"
                            label="Confirm Password"
                            value={values.confirmPassword}
                            type="password"
                            helperText={
                                errors.confirmPassword && touched.confirmPassword
                                    ? errors.confirmPassword
                                    : null
                            }
                            onBlur={handleBlur}
                            error={!!(errors.confirmPassword)}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={10} >
                        {isSubmitting ?
                            <CircularProgress /> :
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Create Account
                            </Button>}
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <>
            {renderCreateAccount()}
        </>
    )
}

export default CreateAccount;