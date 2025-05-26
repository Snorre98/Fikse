import "./App.scss";
import { Outlet } from "react-router";
import { ToastProvider } from "./Context/ToastContext/ToastContext";

function App() {
	return (
		<ToastProvider>
			<Outlet />
		</ToastProvider>
	);
}

export default App;
