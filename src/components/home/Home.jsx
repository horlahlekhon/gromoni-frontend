import React, {useState} from 'react';
import SalesCashBalance from './SalesCashBalance';
import SalesCashBalanceChart from './SalesCashBalanceChart';
import CreateNewButtons from './CreateNewButtons';



const  Home = (props) => {
	
	return (
		<div className="homePage">
			<SalesCashBalance />
			<SalesCashBalanceChart />
			<CreateNewButtons />
		</div>
	)
}

export default Home;