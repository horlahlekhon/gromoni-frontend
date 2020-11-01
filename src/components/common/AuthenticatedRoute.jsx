import React from 'react';
import {getBusiness} from "../../redux/actions";
import {routes} from '../../route/ContentRoutes'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Redirect, Route, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {toast} from 'react-toastify';
import { useCookies } from 'react-cookie';
import App from '../../components/app';

const AuthenticatedRoute = (props) => {
    const thisBusiness = localStorage.getItem('__grm__act__biz__')
    const [cookies, ] = useCookies(['accessToken']);
    const history = useHistory()
    if (thisBusiness) {
        props.getBusiness(cookies.accessToken, thisBusiness)
        .then((business) => {
            if (!business.status) {
                history.push(`${process.env.PUBLIC_URL}/login`)
                business.errorMsg.map(e =>  toast.error(e.message))
            }
        })
    }else {
        toast.error("User does not have any business kindly create a business")
        history.push(`${process.env.PUBLIC_URL}/business/`)
    }
    // eslint-disable-next-line
    const uuidRegex = new RegExp("business/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}")

    // const { location: {  },  } = props;
    return (
        <App>
            <Route exact path="/" render={() => {
                return (<Redirect to={`${process.env.PUBLIC_URL}/${thisBusiness}/Home`} />)
            }} />
            <TransitionGroup>
                {routes(thisBusiness).map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={500}
                                classNames="zoomout"
                                unmountOnExit>
                                <div>
                                    {
                                        uuidRegex.test(window.location.pathname) ?
                                        <Component />
                                            // TODO send to 404
                                        : history.push(`${process.env.PUBLIC_URL}/login`)
                                    }
                                </div>
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