import React from 'react';
import CreateNewButtons from './CreateNewButtons';
import SalesCashBalance from './SalesCashBalance';
import SalesCashBalanceChart from './SalesCashBalanceChart';


const Home = (props) => {

    return (
        <div className="homePage">
            <SalesCashBalanceChart/>
            <SalesCashBalance/>
            <CreateNewButtons/>
        </div>
    )
}

export default Home;