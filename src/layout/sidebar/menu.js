// this includes all the menu in the left side bar also the main navigation component
// this is a nexted array,  which are the sub menus

import {Home,Headphones,Anchor,List,BarChart,PieChart,Users} from 'react-feather';
// import {Sack} from 'reactstrap';

export const MENUITEMS = [
   {
        title: "Home", icon: Home, type: "link", active: true,
   },

   {
        title: "Customers", icon: Users, type: "link", active: false,
   },

   {
        title: "Products", icon: List, type: "link", active: false,
   },

   {
        title: "Sales", icon: BarChart, type: "link", active: false,
   },

   {
        title: "Reports", icon: PieChart, type: "link", active: false,
   },
    
    {
        title: 'Support', icon:Headphones,type: 'sub',active: false, children: [
            {  path: 'http://support.pixelstrap.com/help-center', title: 'Raise Ticket', type: 'exteral_link', },
        ]
    },
   
]



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
