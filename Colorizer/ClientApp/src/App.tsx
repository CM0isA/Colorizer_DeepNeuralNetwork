import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout, Authentication } from './components';
import { Home } from './components/Home';

import './custom.css'
import Login from './components/pages/Login/Login';
import Contact from './components/pages/Contact/Contact';
import { AppContextProvider } from './components/core/contexts/app-context/appContext';
import CreateAccount from './components/pages/Account/CreateAccount';

const MainLayout = () => (
  <Layout>
    <Authentication>
      <Route exact path='/contact' component={Contact} />
    </Authentication>

    
  </Layout>);



const App = () => (
  <AppContextProvider>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/createAccount' component={CreateAccount} />
      <Route path='/home/' component={MainLayout}></Route>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    </Switch>
  </AppContextProvider>
)

export default App;