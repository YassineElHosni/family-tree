import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { AuthContextProvider } from "./contexts/auth-context"
import App from "./App"

ReactDOM.render(
    <BrowserRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </BrowserRouter>,
    document.getElementById("root")
)