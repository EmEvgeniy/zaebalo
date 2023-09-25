import { createBrowserRouter } from "react-router-dom";
import { GoodsPage, LoginPage, MainPage } from "./pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: "/dashboard",
		element: <MainPage />,
		children: [
			{
				path:"goods",
				element: <GoodsPage/>
			}
		]
	},
]);
