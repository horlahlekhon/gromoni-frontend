import HomePage from '../pages/HomePage'
import SalesPage from '../pages/sales/SalesPage'
import ProductsPage from '../pages/ProductsPage'
import ReportsPage from '../pages/ReportsPage'
import CustomersPage from '../pages/CustomersPage'
// import Samplepage from '../pages/samplepage'

export const routes = (biz) => {
    return [
        { path:`/business/${biz}/home`, Component: HomePage },
        { path:`/business/${biz}/customers`, Component: CustomersPage },
        { path:`/business/${biz}/sales`, Component: SalesPage },
        { path:`/business/${biz}/products`, Component: ProductsPage },
        { path:`/business/${biz}/reports`, Component: ReportsPage },
        // { path:"/starter-kit/sample-page", Component: Samplepage },
    ]
}

