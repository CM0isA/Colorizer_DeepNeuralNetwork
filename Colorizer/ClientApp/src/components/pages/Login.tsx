import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { LoginApiService } from 'src/services/login.api.service';
import * as yup from 'yup';
import { AppContext } from '../core/contexts/app-context/appContext';

interface FormStatus {
    message: string;
    type: string;
  }

interface FormStatusProps {
    [key: string]: FormStatus
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
  

    const [formStatus, setFormStatus] = useState<FormStatus>({
      message: '',
      type: '',
    });

    return (
      <div>
          "Muie"
          </div>)



  }

