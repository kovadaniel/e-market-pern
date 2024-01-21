import Admin from "../pages/Admin";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import DevicePage from "../pages/DevicePage";
import Shop from "../pages/Shop";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts"
import {Navigate} from 'react-router-dom'

export const publicRoutes = [
    {path: LOGIN_ROUTE, component: <Auth/>},
    {path: REGISTRATION_ROUTE, component: <Auth/>},
    {path: SHOP_ROUTE, component: <Shop/>},
    {path: DEVICE_ROUTE + "/:id", component: <DevicePage/>},
    {path: '/*', component: <Navigate to={SHOP_ROUTE} replace/>, },
]

export const privateRoutes = [
    {path: BASKET_ROUTE, component: <Basket/>},
]

export const adminRoutes = [
    {path: ADMIN_ROUTE, component: <Admin/>},
]