//create new sales Button, NEW PRODUCTS BUTTON, NEW CUSTOMER BUTTON

import React, {Fragment, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {Container,Row,Col,Card,CardBody} from 'reactstrap';
import {UserPlus,ShoppingBag,ShoppingCart,Users,Database,Layers} from 'react-feather';


const CreateNewButtons = (props) => {
	const currentBusiness = localStorage.getItem('__grm__act__biz__');

	const numberOfCustomers = props.numberOfCustomers.data
	const numberOfProducts = props.numberOfProducts.data
	const numberOfSales = props.numberOfSales.data

	console.log(numberOfCustomers)

	const [customerButton,setCustomerButton] = useState({})

	const [productButton, setProductButton] = useState({})

	const [salesButton, setSalesButton] = useState({})

	useEffect( () => {
        async function buttonLogic() {

				//LOGIC FOR DISPLAYOS CUSTOMERS BUTTON
				if (numberOfCustomers === 0 || null || undefined) {

					setCustomerButton({

						link:"addcustomer",
						icon:<UserPlus className='icon-bg'/>,
						text:"Add Customer",
						number:0,
						bgColor:"bg-default"

					})

				} else {

					setCustomerButton({
						link: "allcustomers",
						bgColor: "bg-primary",
						icon: <Users className='icon-bg'/>,
						text: "Customers",
						number: numberOfCustomers
					})

				}


				//LOGIC FOR DISPLAYOS OF PRODUCTS BUTTON
	            if (numberOfSales === 0 || null || undefined) {

	            	setSalesButton({
	            		link: "addproduct",
						bgColor: "bg-default",
						icon: <ShoppingCart className='icon-bg'/>,
						text: "Create Product",
						number: 0
	            	})

	            } else {

	            	setSalesButton({
						link: "allsales",
						bgColor: "bg-primary",
						icon: <ShoppingBag className='icon-bg'/>,
						text: "Sales",
						number: numberOfSales
					})

			  		
				}

			    
			    //LOGIC FOR DISPLAYOS OF PRODUCTS BUTTON
			    if (numberOfProducts === 0 || null || undefined) {

			    	setProductButton({
			    		link:"allcustomers",
						icon:<Database className='icon-bg'/>,
						text:"Create Product",
						number:0,
						bgColor:"bg-default"
			    	})

			    } else {

	      			setProductButton({
						link: "allproducts",
						bgColor: "bg-primary",
						icon: <Layers className='icon-bg' />,
						text: "Product",
						number: numberOfProducts
					})
	      			
			    }
	}

        buttonLogic()

}, [numberOfProducts, numberOfSales, numberOfCustomers, ])
		      	

	return (
		<Fragment >
			<Container fluid={true}>
	      <Row >

	       <Col className="d-xl-none xl-hidden" sm="2">
            </Col>


            <Col sm="8" xl="3">
            	<NavLink to={`${process.env.PUBLIC_URL}/business/${currentBusiness}/{customerButton.link}`}>
		            <Card className="o-hidden">
		                <CardBody className={`{customerButton.bgColor} b-r-4 card-body`}>
		                <div className="media static-top-widget">
		                    <div className="align-self-center text-center">
		                    	{customerButton.icon}
		                    </div>
		                    <div className="media-body align-self-center text-center">
		                    	<span className="m-0">{customerButton.text}</span>
		                    	<h4 className="mb-0 counter">{customerButton.number}</h4>
		                    	{customerButton.icon}
		                    </div>
		                </div>
		                </CardBody>
		            </Card>
	            </NavLink>
            </Col>

            <Col sm="2" xl="1">
            </Col>
            	

	        <Col sm="8" xl="3">
	        	<NavLink to={`${process.env.PUBLIC_URL}/business/${currentBusiness}/{salesButton.link}`}>
		            <Card className="o-hidden">
		              <CardBody className={`{salesButton.bgColor} b-r-4 card-body`}>
		                <div className="media static-top-widget">
		                  <div className="align-self-center text-center">
		                  	{salesButton.icon}
		                  </div>
		                  <div className="media-body align-self-center text-center">
		                  	<span className="m-0">{salesButton.text}</span>
		                    <h4 className="mb-0 counter">{salesButton.number}</h4>
		                    {salesButton.icon}
		                  </div>
		                </div>
		              </CardBody>
		            </Card>
	            </NavLink>
	        </Col>

	          <Col sm="2" xl="1">
            </Col>
	      	<Col sm="8" xl="3">

	      		<NavLink to={`${process.env.PUBLIC_URL}/business/${currentBusiness}/{productButton.link}`}>
		            <Card className="o-hidden">
		              <CardBody className={`{productButton.bgColor} b-r-4 card-body`}>
		                <div className="media static-top-widget">
		                  <div className="align-self-center text-center">
		                  	{productButton.icon}
		                  </div>
		                  <div className="media-body align-self-center text-center">
		                  	<span className="m-0">{productButton.text}</span>
		                    <h4 className="mb-0 counter">{productButton.number}</h4>
		                    {productButton.icon}
		                  </div>
		                </div>
		              </CardBody>
		            </Card>
	            </NavLink>

        	</Col>

        </Row>

 	    	</Container>         
		</Fragment>
	)
} 

export default  CreateNewButtons;