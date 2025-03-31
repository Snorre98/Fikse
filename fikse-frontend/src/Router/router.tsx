import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router";
import App from "../App";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route element={<Outlet/>}>
            <Route path={"/home"} element={<div>Home</div>}/>
            <Route path={"/home-page"} element={<div>Home-page</div>}/>
            </Route>
        </Route>
    )
)