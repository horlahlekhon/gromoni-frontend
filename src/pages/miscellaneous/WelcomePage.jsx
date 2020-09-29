import React, {Fragment} from 'react'
import {Container} from "reactstrap"
import ModalExample from '../../components/CreateBusinessModal';

const WelcomePage = () => {
    return(
        <Fragment >
            <div className="welcomepage">
                <Container fluid={true}>
                    <div className="welcomepage-inner">
                        <div className="welcomepage-sub">
                            <h1>Welcome to Gromoni!</h1>
                            <p>Please take a moment to complete your business account</p>
                        </div>
                    </div>
                </Container>
                <div className="modal-button">
                <ModalExample />
                </div>
            </div>  
        </Fragment>
    );
};

export default WelcomePage;