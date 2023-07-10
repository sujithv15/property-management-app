import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {GlobalProvider} from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
	<GlobalProvider>
		<App />
		<ToastContainer
			position="top-center"
			autoClose={2000}
			hideProgressBar
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>
	</GlobalProvider>
//  </React.StrictMode>,
)
