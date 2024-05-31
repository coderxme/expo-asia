import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './auth/AuthContext.jsx';
import "animate.css/animate.compat.css"

ReactDOM.createRoot(document.getElementById('root')).render(
            <AuthProvider>
            <App />
            </AuthProvider>
,
)
