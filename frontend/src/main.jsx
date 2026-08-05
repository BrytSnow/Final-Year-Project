import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import {
    AuthProvider
} from "./context/AuthContext.jsx";

import {
    ConversationProvider
} from "./context/ConversationContext";

import {
    ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        <AuthProvider>

            <ConversationProvider>

                <>

                    <App />

                    <ToastContainer
                        position="top-center"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnFocusLoss
                        pauseOnHover
                        draggable
                        theme="colored"
                    />

                </>

            </ConversationProvider>

        </AuthProvider>

    </StrictMode>

);