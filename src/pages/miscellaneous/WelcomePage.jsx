import React, {Fragment} from 'react'
import {Container} from "reactstrap"
import ModalExample from '../../components/CreateBusinessModal';

const WelcomePage = () => {
    return(
        <Fragment>
             <div>
                <Container fluid={true}>
                    <div className="welcomepage">
                        <div className="welcomepage-inner">
                            <h1>Welcome to Gromoni</h1>
                            <p>Please take a moment to complete your business account</p>
                        </div>
                    </div>
                </Container>
            </div>
            <ModalExample/>
        </Fragment>
    );
};

export default WelcomePage;