/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import CrearPedido from "views/CrearPedido";
import Sedes from "views/Sedes.js";
import CrearProductos from "views/CrearProductos.js"
import Inventarios from "views/Inventario.js"
import Clientes from "views/Clientes.js"
import Usuarios from "views/Usuario.js";
import ActualizarInventario from "views/ActualizarInventario.js";
import CrearTransferencia from "views/CrearTransferencia.js";
import CrearVenta from "views/CrearVenta.js";
import Rol from 'views/Rol.js'
import EliminarProductos from 'views/EliminarProducto'

import ModificarProducto from 'views/ModificarProducto'

import VerPedidoRestaurante from 'views/VerPedidoRestaurante'
import VerPedidoUsuario from 'views/VerPedidoUsuario'
import VerPedidoUsuario2 from 'views/VerPedidosUsuario2'
import CrearDescuento from 'views/CrearDescuento'
import CrearCategoria from 'views/CrearCategoria'


var routes = [
  {
    path: "/dashboard",
    name: "Descuentos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-gift-2",
    component: Dashboard,
    layout: "/admin",
    access: 0,
  },
  
  {
    path: "/usuarios",
    name: "Modificar Usuario",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: Usuarios,
    layout: "/admin",
    access: 3,
  },
  {
    path: "/crear-pedido",
    name: "Crear Pedido",
    icon: "tim-icons icon-app",
    component: CrearPedido,
    layout: "/admin",
    access: 3,
  },
  
  {
    path: "/modificarproducto",
    name: "Modificar Producto",
    icon: "tim-icons icon-delivery-fast",
    component: ModificarProducto,
    layout: "/admin",
    access: 2,
  },
  {
    path: "/crear-productos",
    name: "Crear Productos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: CrearProductos,
    layout: "/admin",
    access: 2,
  },
  {
    path: "/eliminar-productos",
    name: "Eliminar Productos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-scissors",
    component: EliminarProductos,
    layout: "/admin",
    access: 2,
  },
  
  {
    path: "/ver-pedidos",
    name: "Ver Pedidos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-cart",
    component: VerPedidoUsuario2,
    layout: "/admin",
    access: 3,
  }
  ,
  
  {
    path: "/ver-pedidos-restaurante",
    name: "Ver Pedidos Restaurante",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-delivery-fast",
    component: VerPedidoRestaurante,
    layout: "/admin",
    access: 2,
  },
  {
    path: "/create-descuento",
    name: "Crear Descuento",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-bar-32",
    component: CrearDescuento,
    layout: "/admin",
    access: 2,
  },
  {
    path: "/categorias",
    name: "Categorias",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-bar-32",
    component: CrearCategoria,
    layout: "/admin",
    access: 2,
  },

];
export default routes;
