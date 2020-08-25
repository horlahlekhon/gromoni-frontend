import {Home,Headphones,Anchor} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub',active: false, children: [
            { path: `${process.env.PUBLIC_URL}/starter-kit/default-page`, title: 'Default', type: 'link' },
        ]
    },
    {
        title: 'Starter kit', icon:Anchor , type: 'sub', active: false, children: [
            { path: `${process.env.PUBLIC_URL}/starter-kit/sample-page`, title: 'Sample Page', type: 'link' },

        ]
    },
    {
        title: 'Support', icon:Headphones,type: 'sub',active: false, children: [
            {  path: 'http://support.pixelstrap.com/help-center', title: 'Raise Ticket', type: 'exteral_link', },
        ]
    },
   
]
