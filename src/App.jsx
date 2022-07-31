import './App.css'

import { useRoutes } from "hookrouter";

import Header from "./components/header/Header";

import Router from "./Router"

export default () => {
	const routeResult = useRoutes(Router);

	return (
		<div className="app">
			<Header />
			{routeResult}
		</div>
	)
}