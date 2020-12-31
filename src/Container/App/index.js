
import styles from './styles'
import React, { Component } from 'react'
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import Taskboard from '../Taskboard/index';
import theme from "./../../commons/Theme"
import { Provider } from 'react-redux'
import configureStore from './../../redux/configureStore'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../../components/GlobalLoading';
import CommonModal from '../../components/Modal';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminLayoutRoute from '../../commons/layouts/AdminLayoutRoute';
import { ADMIN_ROUTES } from '../../routes';
import { CssBaseline } from '@material-ui/core';

const store = configureStore();

class App extends Component {

  renderAdminRoutes() {
    let xhtml = null;
    // console.log('ADMIN_ROUTES: ', ADMIN_ROUTES)
    xhtml = ADMIN_ROUTES.map(route => {
      return (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <ToastContainer />
            <GlobalLoading />
            <CommonModal />
            {/* <Taskboard /> */}
            <Switch>
              {this.renderAdminRoutes()}
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
