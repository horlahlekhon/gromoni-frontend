import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store/index'
import ConfigDB from './data/customizer/config'
import ScrollToTop from './components/common/ScrollToTop';
// import Register from './pages/auth/Register';
import CommingSoon from './pages/miscellaneous/CommingSoon'
import SignInAndRegister from './pages/auth/SignInAndRegister';
import NewBusiness from './pages/NewBusiness';

import {CookieUniversalProvider} from '@shopify/react-cookie';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';

const Root = (props) => {
    const [, setAnim] = useState("");
    const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
    const abortController = new AbortController();


    useEffect(() => {
        setAnim(animation)
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        return function cleanup() {
            abortController.abort();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <CookieUniversalProvider>
                <Provider store={store}>
                    <BrowserRouter basename={`/`}>
                        <ScrollToTop/>
                        <Switch>
                            <Route exact path={`${process.env.PUBLIC_URL}/`} component={CommingSoon}/>
                            <Route exact path={`${process.env.PUBLIC_URL}/login/`} component={SignInAndRegister}/>
                            <Route exact path={`${process.env.PUBLIC_URL}/business/`} component={NewBusiness}/>

                            <Fragment>
                                <AuthenticatedRoute/>
                            </Fragment>
                            <Redirect to={`${process.env.PUBLIC_URL}/login/`}/>
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </CookieUniversalProvider>

        </Fragment>
    )
}
ReactDOM.render(<Root/>,
    document.getElementById('root')
);
serviceWorker.unregister();
