import "./Header.css";

import {
    logoutUser
} from "../../firebase/auth";


export default function Header({ 
    theme, 
    toggleTheme,
    toggleSidebar
}) {


    const handleLogout = async()=>{

        await logoutUser();

        window.location.href="/";

    };


    return (

        <header className="header">


            <div className="header__content">



                <div className="header__left">


                    <button
                        className="menu-btn"
                        onClick={toggleSidebar}
                    >

                        ☰

                    </button>



                    <div className="header__text">


                        <h1>
                            AI Health Assistant
                        </h1>


                    </div>


                </div>





                <div className="header__actions">


                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        Logout

                    </button>



                    <button
                        className="theme-btn"
                        onClick={toggleTheme}
                    >

                        {
                            theme === "light"
                            ? "🌙"
                            : "☀️"
                        }

                    </button>


                </div>



            </div>


        </header>

    );

}