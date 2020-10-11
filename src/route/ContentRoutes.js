import HomePage from '../pages/HomePage'
import SalesPage from '../pages/sales/SalesPage'
import ProductsPage from '../pages/ProductsPage'
import ReportsPage from '../pages/ReportsPage'
import CustomersPage from '../pages/CustomersPage'
// import Samplepage from '../pages/samplepage'

const businessID = localStorage.getItem('__grm__act__biz__');

// main menu routes
export const routes = [   
    { path:`${process.env.PUBLIC_URL}/business/${businessID}/home`, Component: HomePage },
    { path:`${process.env.PUBLIC_URL}/business/${businessID}/customers`, Component: CustomersPage },
    { path:`${process.env.PUBLIC_URL}/business/${businessID}/sales`, Component: SalesPage },
    { path:`${process.env.PUBLIC_URL}/business/${businessID}/products`, Component: ProductsPage },
    { path:`${process.env.PUBLIC_URL}/business/${businessID}/reports`, Component: ReportsPage },
    // { path:"/starter-kit/sample-page", Component: Samplepage }, 
]

