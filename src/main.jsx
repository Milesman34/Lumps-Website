import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { RootReducer } from './redux/reducers/index'

// Core store for the app
const store = configureStore({ 
	reducer: RootReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
