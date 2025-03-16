import Admin from "./page/Admin";
import Auth from "./page/Auth";
import Dish from "./page/Dish";
import Restaurant from "./page/Restaurant";
import { ADMIN_ROUTE, DISH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RESTAURANT_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Comment: Admin
    }
];

export const publicRoutes = [
    {
        path: RESTAURANT_ROUTE,
        Comment: Restaurant
    },
    {
        path: LOGIN_ROUTE,
        Comment: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Comment: Auth
    },
    {
        path: DISH_ROUTE + '/:id',
        Comment: Dish
    }
];