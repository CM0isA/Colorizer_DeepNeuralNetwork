import React, { useContext, useEffect } from 'react';
import { AppContext } from './core/contexts/app-context/appContext';
import { UsersApiService } from '../services/users.api.service';

export function Authentication(props) {
  const { appState, login } = useContext(AppContext);
  const { user } = appState;
  const service = new UsersApiService();
  useEffect(() => {
    if (!user) {
      service.getUserProfile().then(p => login(p, ''));
    }
  }, [user]);
  return (
    <>{props.children}</>
  );
}