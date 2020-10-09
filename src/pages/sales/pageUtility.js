import { HTTP } from '../../api'
export const salesDashboardData = (token, business) => {
    return HTTP.growthApi(token)
        .get(`/report/${business}/dashboards/sales/`)
}