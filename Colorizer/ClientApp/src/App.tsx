import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout, Authentication } from './components';
import { Home } from './components/Home';

import './custom.css'
import Login from './components/pages/Login/Login';
import Contact from './components/pages/Contact/Contact';
import { AppContextProvider } from './components/core/contexts/app-context/appContext';
import CreateAccount from './components/pages/Account/CreateAccount';
import ConfirmAccountPage from './components/pages/Account/ConfirmAccountPage';

const MainLayout = () => (
  <Layout>
    <Authentication>
      <Route path='/contact' component={Contact} />
    </Authentication>

    
  </Layout>);



const App = () => (
  <AppContextProvider>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/createAccount' children={<CreateAccount />}  />
      <Route path="/confirmAccount/:accountCode" children={<ConfirmAccountPage />} />
      <Route path='/home/' component={MainLayout}></Route>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    </Switch>
  </AppContextProvider>
)

export default App;