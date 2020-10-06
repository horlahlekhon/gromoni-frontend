import React from 'react';
import {getBusiness} from "../../redux/actions";
import {routes} from '../../route/ContentRoutes'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Redirect, Route, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {toast} from 'react-toastify';
import {useCookie} from '@shopify/react-cookie';
import App from '../../components/app';

const AuthenticatedRoute = (props) => {
    const thisBusiness = localStorage.getItem('__grm__act__biz__')
    const [accessToken, setAccessToken] = useCookie('accessToken');
    const history = useHistory()
    if (thisBusiness) {
        props.getBusiness(accessToken, thisBusiness)
        .then((business) => {
            if (!business.status) {
                history.push(`${process.env.PUBLIC_URL}/login`)
                toast.error(business.errorMsg)
            }
        })
    }else {
        toast.error("User does not have any business kindly create a business")
        history.push(`${process.env.PUBLIC_URL}/business/`)
    }
    

    // const { location: {  },  } = props;
    return (
        <App>
            <Route exact path="/" render={() => {
                return (<Redirect to={`${process.env.PUBLIC_URL}/Home`} />)
            }} />
            <TransitionGroup>
                {routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={500}
                                classNames="zoomout"
                                unmountOnExit
                            >
                                <div><Component /></div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}
            </TransitionGroup>
        </App>
    )


}


const actions = {
    getBusiness: getBusiness
}

export default connect(null, actions)(withRouter(AuthenticatedRoute));