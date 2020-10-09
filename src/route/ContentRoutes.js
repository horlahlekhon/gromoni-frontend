import HomePage from '../pages/HomePage'
import SalesPage from '../pages/sales/SalesPage'
import ProductsPage from '../pages/ProductsPage'
import ReportsPage from '../pages/ReportsPage'
import CustomersPage from '../pages/CustomersPage'
// import Samplepage from '../pages/samplepage'

export const routes = [   
    { path:"/home", Component: HomePage },
    { path:"/customers", Component: CustomersPage },
    { path:"/sales", Component: SalesPage },
    { path:"/products", Component: ProductsPage },
    { path:"/reports", Component: ReportsPage },
    // { path:"/starter-kit/sample-page", Component: Samplepage }, 
]

