import React, {Fragment, useState} from 'react';
import {Button} from 'react-bootstrap'
import { CSSTransition} from "react-transition-group";
import CreateBusiness from '../../components/CreateBusiness';

const WelcomePage = () => {

		const [showButton, setShowButton] = useState(true);
		const [showMessage, setShowMessage] = useState(false)
		const [height, setHeight] = useState()
		return(
			<div className='d-md-flex h-md-100 align-items-center' style={{backgroundColor: '#ecece7', paddingLeft: "72px"}}>
				<Fragment>
						<div className="col-md-6 p-0 h-md-100">
							<div className="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
								<img width="80%" src="https://res.cloudinary.com/philippa/image/upload/v1601853715/Gromoni/svg_qwe50r.png" alt="welcome page image" />
							</div>
						</div>
						<div className="col-md-6 p-0 h-md-100 d-md-flex align-items-center" >
							<div className="inner h-md-100 p-5" style={{backgroundColor: '#fff', position:"relative"}}>
								<div>
									<div style={{margin: "155.56px auto 63.44px", textAlign: "center"}}>
										<h6>Gromoni</h6>
									</div>
									
										<h2  style={{fontSize: "42px", fontFamily: "'Quicksand', sans-serif", marginBottom:"30px", maxWidth:"278pt", width:"100%"}}>Thank you for Signing up!</h2>
										<p style={{fontFamily: "'Poppins', sans-serif", marginBottom:"24px", fontSize: "16px", maxWidth:"347px", width:"100%"}}>You would need to create a businees to get started</p>
										{showButton && (
										<Button
										color="primary" onClick={() => setShowMessage(true)} style={{fontFamily: "'Poppins', sans-serif", maxWidth:"310pt",width:"100%", height:"60pt"}} size="lg"
										>
											Create Business
										</Button>
										)}
										<CSSTransition 
											in={showMessage}
											timeout={1000}
											classNames="message"
											unmountOnExit
											onEnter={() => setShowButton(false)}
											onExited={() => setShowButton(true)}
										>	
											<div style={{backgroundColor: '#fff', position: "absolute", top: "0.01rem", maxHeight:"100vh", height: "100%"}} dismissible onClose={() => setShowButton(false)}>
												<Button onClick={() => setShowMessage(false)}>
													Cancel
												</Button>
												<CreateBusiness/>
											</div>
										</CSSTransition>
								</div>
								
							</div>
							<div></div>	
						</div>
				</Fragment>
			</div>
		);
};

export default WelcomePage;