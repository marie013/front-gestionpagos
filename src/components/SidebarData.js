import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
// 17:32
export const SidebarData= [
    {
        title:'Home',
        path:'/home',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Pagos',
        path:'/pagos',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title:'Proveedores',
        path:'/proveedores',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title:'Comprobantes',
        path:'/comprobantes',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    }

]