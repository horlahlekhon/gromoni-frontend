import HomePage from '../pages/HomePage'
import SalesPage from '../pages/SalesPage'
import ProductsPage from '../pages/ProductsPage'
import ReportsPage from '../pages/ReportsPage'
import CustomersPage from '../pages/CustomersPage'
// import Samplepage from '../pages/samplepage'

export const routes = [   
    { path:"/Home", Component: HomePage },
    { path:"/Customers", Component: CustomersPage },
    { path:"/Sales", Component: SalesPage },
    { path:"/Products", Component: ProductsPage },
    { path:"/Reports", Component: ReportsPage },
    // { path:"/starter-kit/sample-page", Component: Samplepage }, 
]

