import React, {useState} from 'react';
import BreadCrumb from '../../layout/Breadcrumb';
import {NavLink} from 'react-router-dom';
import SalesCashBalance from './SalesCashBalance';
import SalesCashBalanceChart from './SalesCashBalanceChart';
import CreateNewButtons from './CreateNewButtons';



const  Home = (props) => {
	
	return (
		<div className="homePage">

			<BreadCrumb parent={<NavLink to="/"> Home </NavLink>} subparent={<NavLink to="/">Dashboard</NavLink>} title="Home"/>
			<SalesCashBalance />
			<SalesCashBalanceChart />
			<CreateNewButtons />
		</div>
	)
}

export default Home;