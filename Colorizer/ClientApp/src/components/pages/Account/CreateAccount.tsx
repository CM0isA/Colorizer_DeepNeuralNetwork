import { Button, CircularProgress, Grid, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react'
import * as yup from 'yup';


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
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [account, setAccount] = React.useState<Account>(initialValues)

    const onSubmit = async () => {
        
        const values: Account = {
            email: email,
            
        }

        console.log(account);
        
        
        
        setOpenSnackbar(true);
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
                onSubmit={values => { setAccount(values); onSubmit()}}
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