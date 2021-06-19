import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { LoginApiService } from '../../../services/login.api.service';
import * as yup from 'yup';
import { AppContext } from '../../core/contexts/app-context/appContext';
import { Form, Formik, FormikProps } from 'formik';
import { Button, CircularProgress, Grid, Snackbar, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


interface FormStatus {
  message: string;
  type: string;
}

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
      const { token, userProfile } = response.data;
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
                <Form>
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
        <Grid container justify='space-around' direction='row'>
          <Grid item xs={10}>
            <TextField
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
              error={!!(errors.email)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
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
              error={!!(errors.password)}
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