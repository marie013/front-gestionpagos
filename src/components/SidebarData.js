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
        title:'Registrar pago',
        path:'/registrarPago',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title:'Registrar cliente',
        path:'/registrarCliente',
        icon: <IoIcons.IoMdPersonAdd/>,
        cName: 'nav-text'
    },
    {
        title:'Clientes',
        path:'/clientes',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title:'Pagos',
        path:'/pagos',
        icon: <IoIcons.IoMdFiling/>,
        cName: 'nav-text'
    }

]