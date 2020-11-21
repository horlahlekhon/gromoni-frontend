// this includes all the menu in the left side bar also the main navigation component
// this can contain a nexted array,  which are the sub menus

import {BarChart, Headphones, Home, List, PieChart, Users} from 'react-feather';
// import {Sack} from 'reactstrap';

export const getMenuItems = (business) => {
    return [
        {
            path: `${process.env.PUBLIC_URL}/business/${business}/home`, title: "Home", icon: Home, type: "link", active: true,
        },

        {
            path: `${process.env.PUBLIC_URL}/business/${business}/customers`, title: "Customers", icon: Users, type: "link", active: false,
        },

        {
            path: `${process.env.PUBLIC_URL}/business/${business}/products`, title: "Products", icon: List, type: "link", active: false,
        },

        {
            title: "Sales", icon: BarChart, type: "sub", active: false, children: [
                {
                    title: 'Home', path: `${process.env.PUBLIC_URL}/business/${business}/sales`, type: 'link'
                }
            ]
        },

        {
            path: `${process.env.PUBLIC_URL}/business/${business}/reports`, title: "Reports", icon: PieChart, type: "link", active: false,
        },

        {
            title: 'Support', icon: Headphones, type: 'sub', active: false, children: [
                {path: 'http://support.pixelstrap.com/help-center', title: 'Raise Ticket', type: 'exteral_link',},
            ]
        },

    ]
}

// export const menuItems = (business) => {
//     if(business) {
//         return
//     }else {
//         return []
//     }
// }

// THIS WAS THE INITIAL DUMMY
// {
//     // title: 'Dashboard', icon: Home, type: 'sub',active: false, children: [
//         { path: `${process.env.PUBLIC_URL}/business/Home`, title: 'Overview', type: 'link' },
//         { path: `${process.env.PUBLIC_URL}/business/sales`, title: 'Sales', icon: List, type: 'link' },
//         { path: `${process.env.PUBLIC_URL}/business/customer`, title: 'Customer', icon: List, type: 'link' },
//         { path: `${process.env.PUBLIC_URL}/business/products`, title: 'Products', icon: List, type: 'link' },
//         { path: `${process.env.PUBLIC_URL}/business/reports`, title: 'Reports', icon: List, type: 'link' },
//     // ]
// },
