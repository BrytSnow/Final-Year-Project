import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import Settings from "./pages/Settings/Settings";


function App() {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });


    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);


    const toggleTheme = () => {

        setTheme(current =>
            current === "light"
                ? "dark"
                : "light"
        );

    };


    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <LoginPage
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <RegisterPage
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <ChatPage
                                theme={theme}
                                toggleTheme={toggleTheme}
                            />
                        </ProtectedRoute>
                    }
                />

               <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>

                            <Layout
                                theme={theme}
                                toggleTheme={toggleTheme}
                            >

                                <Settings
                                    theme={theme}
                                    toggleTheme={toggleTheme}
                                />

                            </Layout>

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;