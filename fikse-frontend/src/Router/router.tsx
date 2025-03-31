import {
	Outlet,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router";
import App from "../App";
import { Homepage } from "../PublicPages";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />}>
			<Route element={<Outlet />}>
				<Route path={"/"} element={<Homepage />} />
				<Route path={"/not-home"} element={<div>This is not home</div>} />
			</Route>
		</Route>,
	),
);
