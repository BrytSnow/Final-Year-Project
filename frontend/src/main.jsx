import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    ConversationProvider
} from "./context/ConversationContext";
import "./index.css";
import App from "./App.jsx";
import {
    AuthProvider
} from "./context/AuthContext.jsx";


createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        <AuthProvider>

            <ConversationProvider>

                <App/>

            </ConversationProvider>

        </AuthProvider>

    </StrictMode>

);