import React, {Fragment, useState} from 'react';
import {Container, Row, Col, Button, Card, CardImg} from "reactstrap";
import { CSSTransition } from "react-transition-group";
import CreateBusiness from '../../components/CreateBusiness';

const WelcomePage = () => {

		const [showButton, setShowButton] = useState(true);
		const [showMessage, setShowMessage] = useState(false)
		return(
			<div style={{backgroundColor: '#ecece7', height: "100vh"}}>
				<Fragment>
								<Container className="major" >
									<Row >
										<Col>
											<div>
												<img width="100%" src="https://res.cloudinary.com/philippa/image/upload/v1601853715/Gromoni/svg_qwe50r.png" alt="welcome page image" />
											</div>
										</Col>
										<Col className="second-col">
											<div>
												<div className="inner">
													<h6>Gromoni</h6>
														<h2>Thank you for Signing up!</h2>
														<p>You would need to create a businees to get started</p>
														{showButton && (
														<Button
															onClick={() => setShowMessage(true)}
															size="sm"
														>
															Create a Business Account Now
														</Button>
														)}
												</div>
											</div>
										</Col>
									</Row>
										<CSSTransition 
											in={showMessage}
											timeout={1000}
											classNames="message"
											unmountOnExit
											onEnter={() => setShowButton(false)}
											onExited={() => setShowButton(true)}
										>	
										<div className="message form-button" dismissible onClose={() => setShowButton(false)}>
											<div>
												<CreateBusiness/>
												<Button onClick={() => setShowMessage(false)}>
													Cancel
												</Button>
											</div>
										</div>
									</CSSTransition>
								</Container>
				</Fragment>
			</div>
		);
};

export default WelcomePage;