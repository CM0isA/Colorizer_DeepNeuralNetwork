// react
import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
// services
import { LoginApiService } from '_services';
//styles
import * as Yup from 'yup';
import { Formik, Form, FormikProps } from 'formik';
import {AppContext} from "../core/contexts/app-context/appContext";
import { Grid, TextField, Button, Typography, makeStyles, CircularProgress } from '@material-ui/core';

interface LoginProps {
  email: string;
  password: string;
}

interface FormStatus {
  message: string;
  type: string;
}

interface FormStatusProps {
  [key: string]: FormStatus
}

const formStatusProps: FormStatusProps = {
  error: {
    message: 'Error. Please try again.',
    type: 'error',
  }
};

const useStyles = makeStyles({
  root: {
    maxWidth: '450px',
    textAlign: 'center',
    margin: '100px auto',
    backgroundColor: 'white',
    border: '1px solid black'
  },
  loginButton: {
    textAlign: 'center',
    padding: '25px 0'
  },
  title: {
    padding: '15px 0'
  },
  successMessage: {
    color: 'green'
  },
  errorMessage: {
    color: 'red'
  }
});

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Must be a valid email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , 'Must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
});

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const loginService = new LoginApiService();
  const { login } = useContext(AppContext);

  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: '',
    type: '',
  });

  const onSubmit= async (model, actions) => {
    const response = await loginService.login(model);
    const status = response.status;

    if (status !== 200) {
      setDisplayFormStatus(true);
      setFormStatus(formStatusProps.error);
      actions.setSubmitting(false);
    } else {
      // @ts-ignore
      const { token, userProfile } = response.data;
      localStorage.setItem('token', token);
      login(userProfile, token);
      actions.setSubmitting(false);
      history.replace('/');
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<LoginProps>) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting
          } = props
          return (
            <Form>
              <Typography variant='h4' className={classes.title}>Login</Typography>
              <Grid container justify='space-around' direction='row'>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="email"
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Enter your email.'
                    }
                    error={
                      !!(errors.email)
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : errors.password
                    }
                    error={
                      !!(errors.password)
                    }
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={10} className={classes.loginButton}>
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
                  {displayFormStatus && (
                    <div className="form-status">
                      {formStatus.type === 'error' && (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      )}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  )
}

export default Login;
