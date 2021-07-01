import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { LoginApiService } from '../../../services/login.api.service';
import * as yup from 'yup';
import { AppContext } from '../../core/contexts/app-context/appContext';
import { Form, Formik, FormikProps } from 'formik';
import { Button, CircularProgress, Grid, Link, Snackbar, TextField, makeStyles, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

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
      marginBottom: '10px',
      float: 'right'

  },
  title: {
      padding: '15px 0'
  },
  createButton: {
    backgroundColor: 'tomato',
    float: 'left',
    marginTop: '10px',
    marginBottom: '10px',
  }
});

interface LoginProps {
  email: string;
  password: string;
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
});

const Login: React.FC = () => {

  const history = useHistory();
  const classes = useStyles();
  const loginService = new LoginApiService();
  const { login } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (model, actions) => {
    const response = await loginService.login(model);
    const status = response.status;

    if (status !== 200) {
      setOpen(true);
    }
    else {
      const { token,  userProfile } = response.data;
      localStorage.setItem('token', token);
      login(userProfile, token);
      actions.setSubmitting(false);
      history.replace('/');
    }

  }

  const renderLogin = () => {
    
    
    return (
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props: FormikProps<LoginProps>) => {
              const {
                values, touched, errors, isSubmitting, handleChange, handleBlur,
              } = props;

              return (
                <Form className={classes.root}> 
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="error">
                      Login Failed! Please try again!
                    </Alert>
                  </Snackbar>
                  {renderElements(values, errors, touched, isSubmitting, handleChange, handleBlur)}
                </Form>);
            } }
          </Formik>
    );
  }



  const renderElements = (values, errors, touched, isSubmitting, handleChange, handleBlur) => {
    return (
      <>
      <Typography className={classes.title}>Login Page</Typography>
        <Grid container justify='space-around' direction='row'>
          <Grid item xs={10}>
            <TextField
              fullWidth
              required
              name="email"
              id="email"
              label="Email"
              value={values.email}
              type="email"
              helperText={
                errors.email && touched.email
                  ? errors.email
                  : ''
              }
              onBlur={handleBlur}
              error={errors.email && touched.email ? true : false}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              required
              name="password"
              id="password"
              label="Password"
              value={values.password}
              type="password"
              helperText={
                errors.password && touched.password
                  ? errors.password
                  : ""
              }
              onBlur={handleBlur}
              error={errors.password && touched.password ? true : false}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10} >
            <Link href={'/createAccount'}>
              <Button 
              className={classes.createButton}
              >Create an Account</Button>
            </Link>
            
            {isSubmitting ?
              <CircularProgress /> :
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>}
            
          </Grid>
        </Grid>
      </>
    )
  }




  return (
    <>
      {renderLogin()}
    </>

  )
}

export default Login;