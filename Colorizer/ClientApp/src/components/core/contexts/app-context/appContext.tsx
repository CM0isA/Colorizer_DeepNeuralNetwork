import React, { createContext, useMemo, useReducer } from 'react';
import { UserProfile } from '../../../models/userProfile.model';
import { AppActions } from './appActions';
import { appReducer } from './appReducer';
import { AppState } from './appState';


const initialAppState: AppState = {
  isLoading: true,
  token: '',
  email: '',
  user: null
};

let dispatcher = {
  updateEmail: (newEmail: string) => {},
  login: (user: UserProfile, token: string) => {},
  logout: () => {},
};

export const AppContextProvider = ({ children }: any) => {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  dispatcher = useMemo(
    () => ({
      updateEmail: (newEmail: string) => {
        dispatch({
          type: AppActions.UPDATE_EMAIL,
          newEmail: newEmail,
        });
      },
      login: (user: UserProfile, token: string) => {
        dispatch({
          type: AppActions.LOGIN,
          token: token,
          user: user,
        });
      },
      logout: () => {
        dispatch({
          type: AppActions.LOGOUT,
        });
      },
    }),
    []
  );

  const appContext = {
    appState,
    ...dispatcher,
  };
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export const AppContext = createContext({
  appState: initialAppState,
  ...dispatcher,
});
