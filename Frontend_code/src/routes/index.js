import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import AllOrders from '../pages/AllOrders'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import ShippingPage from '../pages/Shipping'
import ConfirmOrderPage from '../pages/ConfirmOrder'
import Payment from '../pages/Payment'
import Profile from '../pages/Profile '
import VendorPanel from '../pages/VendorPanel'
import VendorProducts from '../pages/VendorProduct'
import GeneralPanel from '../pages/GeneralPanel'
import Pagesdetail from '../components/Pagesdetail'
import ChangePasswordForm from '../components/ChangePasswordForm '
import Orders from "../pages/Orders"
import Dashboard from '../pages/Dashboard'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "change-password", element: <ChangePasswordForm /> },
            { path: "sign-up", element: <SignUp /> },
            { path: "profile", element: <Profile /> },
            { path: "product-category", element: <CategoryProduct /> },
            { path: "product/:id", element: <ProductDetails /> },
            { path: 'cart', element: <Cart /> },
            { path: "search", element: <SearchProduct /> },
            { path: "shipping", element: <ShippingPage /> },
            { path: "confirm-order", element: <ConfirmOrderPage /> },
            { path: "payment", element: <Payment /> },
            { path: "pages-detail/:pageTitle", element: <Pagesdetail /> },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path : "dashboard",
                        element : <Dashboard/>
                     },
                    { path: "profile", element: <Profile /> },
                    { path: "all-users", element: <AllUsers /> },
                    { path: "all-products", element: <AllProducts /> },
                    { path: "all-orders", element: <AllOrders /> }
                ]
            },
            {
                path: "vendor-panel",
                element: <VendorPanel />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path: "vendor-products", element: <VendorProducts /> }
                ]
            },
            {
                path: "general-panel",
                element: <GeneralPanel />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path : "user-orders", element : <Orders/> }
                ]
            }
        ]
    }
])

export default router;