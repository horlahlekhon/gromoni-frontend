import React, {Fragment, useState} from 'react';
import {Button} from 'react-bootstrap'
import { CSSTransition} from "react-transition-group";
import CreateBusiness from '../../components/CreateBusiness';

import {XSquare} from 'react-feather'
const xSquare = <XSquare/>


const WelcomePage = () => {

		const [showButton, setShowButton] = useState(true);
		const [showMessage, setShowMessage] = useState(false)

		return(
			<div className='d-md-flex h-md-100 align-items-center welcome-pg-cont'>
				<Fragment>
						<div className="col-md-8 p-0 h-md-100">
							<div className="h-100 p-5 text-center">
								<img width="70%" src="https://res.cloudinary.com/philippa/image/upload/v1601853715/Gromoni/svg_qwe50r.png" alt="welcome page image" />
							</div>
						</div>
						<div className="col-md-4 p-0 h-md-100" >
							<div className="welcome-pg-second-inner h-md-100 p-5 ">
								<h6 class="welcome-pg-second-logo">Gromoni</h6>									
								<h2 class="welcome-pg-second-heading">Thank you for Signing up!</h2>
								<p class="welcome-pg-second-text">You would need to create a business to get started</p>
								{showButton && (
								<Button
								color="primary" onClick={() => setShowMessage(true)} className="welcome-pg-second-btn"
								>
									Create Business
								</Button>
								)}
							</div>
							<CSSTransition 
							in={showMessage}
							timeout={1000}
							classNames="message"
							unmountOnExit
							onEnter={() => setShowButton(false)}
							onExited={() => setShowButton(true)}
							>	
								<div className="transition-message" dismissible onClose={() => setShowButton(false)}>
									<i variant="outline-primary" style={{color:"#72b3f9", float:"right", marginRight:"20px"}} onClick={() => setShowMessage(false)}>
										{xSquare}
									</i>
									<CreateBusiness/>
								</div>
							</CSSTransition>		
						</div>		
				</Fragment>
			</div>
		);
};

export default WelcomePage;