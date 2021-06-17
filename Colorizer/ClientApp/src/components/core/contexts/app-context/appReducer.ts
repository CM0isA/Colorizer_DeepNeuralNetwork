import { AppActions } from './appActions';
import { AppState } from './appState';

export const appReducer = (prevState: AppState, action: any) => {
  switch (action.type) {
    case AppActions.UPDATE_EMAIL: {
      return {
        ...prevState,
        email: action.newEmail,
      };
    }
    case AppActions.LOGIN: {
      return {
        ...prevState,
        token: action.token,
        user: action.user,
      };
    }
    case AppActions.LOGOUT: {
      return {
        ...prevState,
        token: null,
      };
    }
    default: {
      return {
        // unrecognized dispatched action
        ...prevState,
      };
    }
  }
};
