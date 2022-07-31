import './App.css'

import { useRoutes } from "hookrouter";

import MainHeader from "./components/MainHeader";

import Router from "./Router"

export default () => {
	const routeResult = useRoutes(Router);

	return (
		<div className="app">
			<MainHeader />
			{routeResult}
		</div>
	)
}